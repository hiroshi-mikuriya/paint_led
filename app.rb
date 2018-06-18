# frozen_string_literal: true

require 'sinatra'
require 'sinatra/reloader'
require './led'

##
# Server program
class App < Sinatra::Base
  register Sinatra::Reloader
  enable :sessions
  set :bind, '0.0.0.0' # 外部アクセス可
  set :port, 9494

  def initialize
    LED.SetUrl('127.0.0.1')
    LED.SetPort(9001)
    LED.EnableSimulator(0)
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
    LED.Show
    'ok'
  end
end
