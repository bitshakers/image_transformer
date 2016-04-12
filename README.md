# Bitmasters' Bitmap Transformer
### Files accepted:

* Microsoft .bmp files ('BM' header)
* non-palette and palette .bmp
* Image can be any size
* processor can be LE or BE

###Use
From the command line

./bin/index.js flag yourFile.bmp

Copy/paste the following example:
./bin/index.js

(pikachu.bmp is the default file, green is the default transform. This produces green-scaled pikachu to /images directory.)

./bin/index.js -r
(produces red-scaled pikachu to /images directory.)

Output files are returned to the /images directory.

###Flag options:
* -r OR red  : leave only the red channel
* -b OR blue : leave only the blue channel
* -g OR green: leave only the green channel
* -G OR gray : apply grayscale transform
* -i OR invert OR no selection (default) : inverts all color values

###Provided images:
* bumblebee.bmp
* fractalSmall.bmp
* mushrooms.bmp
* palette-bitmap.bmp
* non-palette-bitmap.bmp
* pikachu.bmp

#### Bitmasters is a collaboration between Gene Troy, Ben Harding and Kristopher Skelton.
