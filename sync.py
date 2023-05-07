import os, glob
from argparse import ArgumentParser
from pathlib import Path


def main(path: str):
    svg, tex = map(
        set, map(glob.glob,
                 (os.path.join(path, s) for s in ['*.svg', '*.tex'])))
    # delete SVGs that have no TEXs
    for f in svg.difference(tex):
        os.remove(f)
    # print TEXs that have no SVGs
    for f in tex.difference(svg):
        print(f)


if __name__ == '__main__':
    parser = ArgumentParser(
        description='Remove excessive SVG files, print missing SVG files')
    parser.add_argument('path',
                        type=Path,
                        help='path to look for *.svg and *.tex files')
    args = parser.parse_args()
    main(args.path)
