#Bitmasters' Bitmap Transformer
###Files accepted:

*Microsoft .bmp files ('BM' header).
*non-palette and palette .bmp
*Image can be any size
*processor can be LE or BE

##use
From the command line
node index <file.bmp> -flag

###flag options:
-r OR red  : leave only the red channel
-b OR blue : leave only the blue channel
-g OR green: leave only the green channel
-G OR gray : apply grayscale transform
-i OR invert OR no selection (default) : inverts all color values
