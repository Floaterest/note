tl="https://mirror.ctan.org/systems/texlive/tlnet/install-tl-unx.tar.gz"

wget -q $tl
tar -xf $(basename $tl)
dir=$(ls -d install-tl-*/ | head -n1 | cut -f1 -d'/')
sudo $dir/install-tl -q -profile texlive.profile
