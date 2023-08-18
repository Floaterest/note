FROM node:latest

RUN corepack enable
RUN corepack prepare pnpm@latest --activate
RUN pnpm config set store-dir .pnpm-store

RUN apt update
# libssl needed for tectonic
RUN curl http://nz2.archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb -o libssl1.1.deb
RUN dpkg -i libssl1.1.deb
RUN curl --proto '=https' --tlsv1.2 -fsSL https://drop-sh.fullyjustified.net | sh
RUN mv tectonic /usr/local/bin

RUN apt install -y pdf2svg qpdf tree jq
# gnome-terminal docker-desktop
