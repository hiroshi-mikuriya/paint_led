# frozen_string_literal: true

require 'bundler'
Bundler.require

require './app'

Thread.new { App.run! { |server| } }

LED.SetUrl('192.168.0.10')
loop do
  LED.Show
  LED.Wait(100)
end
