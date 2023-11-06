FROM node:latest

RUN apt-get update
RUN apt-get -y install pdf2svg qpdf tree jq
RUN curl -fsSL https://bun.sh/install | bash
RUN mv /root/.bun/bin/bun /usr/local/bin

# libssl needed for tectonic
RUN curl http://nz2.archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb -o libssl1.1.deb
RUN dpkg -i libssl1.1.deb
# install tecotonic
RUN curl --proto '=https' --tlsv1.2 -fsSL https://drop-sh.fullyjustified.net | sh
RUN mv tectonic /usr/local/bin
