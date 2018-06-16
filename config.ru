# frozen_string_literal: true

require 'bundler'
Bundler.require

require './app'

Thread.new { App.run! { |server| } }

loop do
  LED.Show
  LED.Wait(100)
end
