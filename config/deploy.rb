# config valid only for current version of Capistrano
#lock '3.3.5'


set :application, 'dashboard'
set :repo_url, 'git@github.com:rfmines/dashboard.git'
set :stages, ["staging", "production"]
set :default_stage, "staging"
set :deploy_via, :copy
set :app_command, 'dashboard'
set :app_name, 'dashboard.js'

SSHKit.config.command_map[:rake]  = "bundle exec rake" #8
SSHKit.config.command_map[:rails] = "bundle exec rails"
# Default branch is :master
#ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }.call
set :branch, ENV['BRANCH'] || "master"
# Default branch is :master
# ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }.call

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, '/var/www/my_app_name'

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# set :linked_files, fetch(:linked_files, []).push('config/database.yml')

# Default value for linked_dirs is []
# set :linked_dirs, fetch(:linked_dirs, []).push('bin', 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system')

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5

namespace :deploy do

  desc 'Restart application'
  task :restart do
    invoke 'pm2:restart'
  end

  desc 'Start application'
  task :start do
    invoke 'pm2:start'
  end

  desc 'Stop application'
  task :stop do
    invoke 'pm2:stop'
  end

 desc 'Delete application'
  task :delete do
    invoke 'pm2:delete'
  end

  desc 'Show logs of the application'
  task :show_log do
    invoke 'pm2:show_log'
  end

   desc 'flush_logs of the application'
  task :flush_logs do
    invoke 'pm2:flush_logs'
  end

  desc 'List application'
  task :list do
    invoke 'pm2:list'
  end

  desc 'npm install'
  task :npm_install do
    invoke 'npm:install'
  end

  after :publishing, :npm_install
  after :npm_install, :restart
end
