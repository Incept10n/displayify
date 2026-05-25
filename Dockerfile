FROM alpine:3.19

RUN apk add --no-cache \
    libc6-compat \
    ca-certificates \
    curl \
    ffmpeg \
    bash \
    # Кодеки (правильные названия в Alpine)
    x264 \
    x265 \
    libvpx \
    opus \
    opus-tools \
    # Дополнительные библиотеки (правильные названия)
    alsa-lib \
    pulseaudio \
    libdrm \
    mesa-dri-gallium \
    # VA-API для аппаратного ускорения
    libva \
    libva-intel-driver

# Создаем рабочую директорию
WORKDIR /app

# Копируем локальный бинарный файл MediaMTX в контейнер
COPY mediamtx /app/mediamtx

COPY mediamtx.yml.j2 /app/mediamtx.yml.j2

# Делаем бинарник исполняемым
RUN chmod +x /app/mediamtx

# Копируем конфигурационный файл (опционально, можно монтировать через volume)
# COPY config/mediamtx.yml /app/mediamtx.yml

# Открываем порты:
# 8554 - RTSP
# 8889 - WebRTC (HTTP API)
# 8189 - WebRTC (UDP)
# 1935 - RTMP (опционально)
# 8888 - HLS (опционально)
# 9997 - API управления (опционально)
#EXPOSE 8554 8889 8189/udp 1935 8888 9997
EXPOSE 8889 8189/udp 1935

# Точка входа - запускаем MediaMTX
ENTRYPOINT ["/app/mediamtx"]
