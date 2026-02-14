'use client';

import { useEffect, useRef, useState } from 'react';

interface AvatarVideoProps {
  session_url: string;
  access_token: string;
  is_speaking: boolean;
  streamer_status?: 'idle' | 'thinking' | 'responding';
  responding_to_user?: string;
}

type AvatarState = 'connecting' | 'waiting' | 'live' | 'speaking' | 'thinking' | 'error';

export function AvatarVideo({
  session_url,
  access_token,
  is_speaking,
  streamer_status,
  responding_to_user,
}: AvatarVideoProps) {
  const video_ref = useRef<HTMLVideoElement>(null);
  const room_ref = useRef<import('livekit-client').Room | null>(null);
  const [avatar_state, set_avatar_state] = useState<AvatarState>('connecting');
  const [is_muted, set_is_muted] = useState(false);

  useEffect(() => {
    if (session_url === '' || access_token === '') {
      return;
    }

    let cancelled = false;

    async function connect_to_room() {
      const { Room, RoomEvent, Track } = await import('livekit-client');

      if (cancelled) {
        return;
      }

      const room = new Room({
        adaptiveStream: true,
        dynacast: true,
      });

      room_ref.current = room;
      set_avatar_state('connecting');

      const attach_track = (track: import('livekit-client').RemoteTrack) => {
        if (cancelled) {
          return;
        }

        if (track.kind === Track.Kind.Video) {
          const video_element = video_ref.current;
          if (video_element !== null) {
            track.attach(video_element);
            set_avatar_state('live');
          }
        }

        if (track.kind === Track.Kind.Audio) {
          const audio_element = track.attach();
          audio_element.volume = 1.0;
          document.body.appendChild(audio_element);
        }
      };

      room.on(RoomEvent.TrackSubscribed, (_track, publication) => {
        const track = publication.track;
        if (track !== null && track !== undefined) {
          attach_track(track as import('livekit-client').RemoteTrack);
        }
      });

      room.on(RoomEvent.TrackUnsubscribed, (track) => {
        track.detach();
      });

      room.on(RoomEvent.Connected, () => {
        if (cancelled) {
          return;
        }
        set_avatar_state('waiting');

        // Check for existing participants (late joiner)
        for (const participant of room.remoteParticipants.values()) {
          for (const publication of participant.trackPublications.values()) {
            const track = publication.track;
            if (track !== null && track !== undefined && publication.isSubscribed) {
              attach_track(track as import('livekit-client').RemoteTrack);
            }
          }
        }
      });

      room.on(RoomEvent.Disconnected, () => {
        if (!cancelled) {
          set_avatar_state('error');
        }
      });

      try {
        await room.connect(session_url, access_token);
      } catch (err) {
        console.error('[AVATAR] LiveKit connect failed:', err instanceof Error ? err.message : err);
        if (!cancelled) {
          set_avatar_state('error');
        }
      }
    }

    connect_to_room();

    return () => {
      cancelled = true;
      const room = room_ref.current;
      if (room !== null) {
        room.disconnect();
        room_ref.current = null;
      }
    };
  }, [session_url, access_token]);

  // Update speaking/thinking state from props
  useEffect(() => {
    if (avatar_state !== 'live' && avatar_state !== 'speaking' && avatar_state !== 'thinking') {
      return;
    }

    if (streamer_status === 'thinking') {
      set_avatar_state('thinking');
    } else if (is_speaking) {
      set_avatar_state('speaking');
    } else {
      set_avatar_state('live');
    }
  }, [is_speaking, streamer_status, avatar_state]);

  const toggle_mute = () => {
    const video_element = video_ref.current;
    if (video_element !== null) {
      video_element.muted = !video_element.muted;
      set_is_muted(!is_muted);
    }
  };

  const speaking_class = is_speaking ? ' speaking' : '';
  const is_video_visible = avatar_state === 'live' || avatar_state === 'speaking' || avatar_state === 'thinking';

  return (
    <div className="avatar-container">
      <div className={`avatar-video-wrapper${is_video_visible ? ' has-video' : ''}`}>
        <div className={`avatar-ring${speaking_class}${avatar_state === 'thinking' ? ' thinking' : ''}`}>
          <video
            ref={video_ref}
            className={`avatar-video-element${is_video_visible ? ' is-visible' : ''}`}
            autoPlay
            playsInline
            muted={is_muted}
          />
          {!is_video_visible && (
            <div className="avatar-ring-inner">
              {avatar_state === 'error' ? '!' : 'K'}
            </div>
          )}
          {avatar_state === 'thinking' && (
            <div className="avatar-thinking-indicator">
              <span className="avatar-thinking-dot" />
              <span className="avatar-thinking-dot" />
              <span className="avatar-thinking-dot" />
            </div>
          )}
        </div>
        {avatar_state === 'speaking' && responding_to_user !== undefined && responding_to_user !== '' && (
          <div className="avatar-responding-overlay">
            Responding to @{responding_to_user}
          </div>
        )}
        <div className="avatar-state-indicator">
          <span className={`avatar-state-dot ${avatar_state}`} />
          <span className="avatar-state-label">
            {avatar_state === 'connecting' && 'CONNECTING'}
            {avatar_state === 'waiting' && 'WAITING'}
            {avatar_state === 'live' && 'LIVE'}
            {avatar_state === 'speaking' && 'SPEAKING'}
            {avatar_state === 'thinking' && 'THINKING'}
            {avatar_state === 'error' && 'ERROR'}
          </span>
        </div>
      </div>
    </div>
  );
}
