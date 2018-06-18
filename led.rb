require 'fiddle/import'

##
# load 3D LED CUBE SDK
module LED
  extend Fiddle::Importer
  dlload './libledLib.dylib'
  extern 'void SetUrl(char *)'
  extern 'void SetPort(short)'
  extern 'void SetLed(int, int, int, int)'
  extern 'void Clear()'
  extern 'void Show()'
  extern 'void Wait(int)'
  extern 'void ShowMotioningText1(char *)'
  extern 'void SetChar(int, int, int, char, int)'
  extern 'void ShowFirework(int, int, int)'
  extern 'void EnableSimulator(int)'
end
