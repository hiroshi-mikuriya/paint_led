# frozen_string_literal: true

require 'sinatra'
require 'sinatra/reloader'
require 'json'
require 'socket'
require 'fiddle/import'

##
# load 3D LED CUBE SDK
module LED
  extend Fiddle::Importer
  dlload './libledLib.dylib'
  extern 'void SetUrl(char *)'
  extern 'void SetLed(int, int, int, int)'
  extern 'void Clear()'
  extern 'void Show()'
  extern 'void Wait(int)'
  extern 'void ShowMotioningText1(char *)'
  extern 'void SetChar(int, int, int, char, int)'
  extern 'void ShowFirework(int, int, int)'
end

##
# Server program
class App < Sinatra::Base
  register Sinatra::Reloader
  enable :sessions
  set :bind, '0.0.0.0' # 外部アクセス可
  set :port, 9494

  def initialize
    super
  end

  get '/' do
    haml :index, locals: { title: 'LED PAINT' }
  end

  post '/led' do
    params['led'].each do |x, yy|
      yy.each.with_index do |v, y|
        LED.SetLed(x.to_i, y.to_i, 0, v.hex)
      end
    end
    # LED.Show
    'ok'
  end
end
