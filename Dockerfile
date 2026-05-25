FROM alpine:3.19

RUN apk add --no-cache \
    libc6-compat \
    ca-certificates \
    curl \
    ffmpeg \
    bash \
    # Кодеки
    x264 \
    x265 \
    libvpx \
    opus \
    opus-tools \
    # Доп. библиотеки
    alsa-lib \
    pulseaudio \
    libdrm \
    mesa-dri-gallium \
    # VA-API
    libva \
    libva-intel-driver \
    # ── для рендера Jinja2-шаблона ──
    python3 \
    py3-pip

WORKDIR /app

COPY mediamtx /app/mediamtx
COPY mediamtx.yml.j2 /app/mediamtx.yml.j2

RUN chmod +x /app/mediamtx

EXPOSE 8889 8189/udp 1935

ENTRYPOINT ["/app/mediamtx", "rendered/mediamtx.yml"]
