import os
import requests

LATEST = 'https://api.github.com/repos/jgm/pandoc/releases/latest'


def latest(url: str) -> str:
    with requests.get(url) as r:
        r.raise_for_status()
    return r.json()['assets_url']


def assets(url: str) -> str:
    with requests.get(url) as r:
        r.raise_for_status()
        for asset in r.json():
            if asset['name'].endswith('amd64.deb'):
                return asset['browser_download_url']


def download(url: str) -> str:
    file = os.path.basename(url)
    with requests.get(url) as r:
        r.raise_for_status()
        with open(file, 'wb') as f:
            for chunk in r.iter_content(chunk_size=81920):
                f.write(chunk)
    return file


if __name__ == '__main__':
    os.system(f'sudo dpkg -i {download(assets(latest(LATEST)))}')
