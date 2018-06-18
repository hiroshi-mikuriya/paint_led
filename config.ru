# frozen_string_literal: true

require 'bundler'
Bundler.require

require './app'

App.run! { |server| }
