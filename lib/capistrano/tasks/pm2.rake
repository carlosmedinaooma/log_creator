require 'json'

namespace :pm2 do
  def start_app
    within current_path do
      execute "NODE_ENV=#{fetch(:stage)} pm2 start #{current_path}/#{fetch(:app_name)}"
    end
  end

  def restart_app
    within current_path do
      execute "NODE_ENV=#{fetch(:stage)} pm2 restart #{current_path}/#{fetch(:app_name)}"
    end
  end

  def stop_app
    within current_path do
      execute :pm2, :stop, fetch(:app_command)
    end
  end

  def force_stop_app
    within current_path do
      execute :pm2, :stop, fetch(:app_command), '--force'
    end
  end

  def graceful_reload_app
    within current_path do
      execute :pm2, :gracefulReload, fetch(:app_command)
    end
  end

  def delete_app
    within current_path do
      execute :pm2, :delete, fetch(:app_command)
    end
  end

  def show_log_app
    within current_path do
      execute :pm2, :logs, fetch(:app_command)
    end
  end

  def flush_logs_app
    within current_path do
      execute :pm2, :flush
    end
  end

  def list_app
    within current_path do
      execute :pm2, :list
    end
  end

  def app_status
    within current_path do
      ps = JSON.parse(capture :pm2, :jlist, fetch(:app_command))
      x = ps.map{|x| x if x['name']==fetch(:app_command)}.compact
      # status: online, errored, stopped
      x.empty? ? nil : x.last["pm2_env"]["status"]
    end
  end

  desc 'Start app'
  task :start do
    on roles(:app) do
      start_app
    end
  end

  desc 'Stop app'
  task :stop do
    on roles(:app) do
      stop_app
    end
  end

  desc 'Show logs of the app'
  task :show_log do
    on roles(:app) do
      show_log_app
    end
  end

   desc 'flush_logs of the app'
  task :flush_logs do
    on roles(:app) do
      flush_logs_app
    end
  end

  desc 'Restart app gracefully'
  task :restart do
    on roles(:app) do
      case app_status
      when nil
        info 'App is not registerd'
        start_app
      when 'stopped'
        info 'App is stopped'
        #restart_app
        start_app
      when 'errored'
        info 'App has errored'
        start_app
      when 'online'
        info 'App is online'
        stop_app
        start_app
        #restart_app
      end
    end
  end

desc 'List apps'
  task :list do
    on roles(:app) do
      list_app
    end
  end

  desc 'Stop app immediately'
  task :force_stop do
    on roles(:app) do
      force_stop_app
    end
  end

  desc 'Delete app'
  task :delete do
    on roles(:app) do
      delete_app
    end
  end
end

namespace :npm do
  desc 'npm install'
  task :install do
    on roles(:app) do
      execute "cd #{current_path} && npm install"
    end
  end
end
