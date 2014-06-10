require 'sinatra'

get '/' do
  erb :index
end

get '/javascript/clock' do
  erb :javascript_clock
end

get '/javascript/pingpong' do
  erb :javascript_pingpong
end