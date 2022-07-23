#!/bin/sh

latest="https://api.github.com/repos/jgm/pandoc/releases/latest"
asset=$(wget -q -O /dev/stdout $latest | jq -r '.assets_url')
download=$(wget -q -O /dev/stdout $asset | jq -r 'map(select(.name|endswith("amd64.deb")))[0].browser_download_url')

wget -q $download
sudo dpkg -i $(basename $download)
