lock '3.4.0'

set :application, 'anylist'
set :repo_url, 'git@github.com:asm-products/anylist.git'

ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

set :deploy_to, '/var/www/anylist'

set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/secrets.yml')
set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/uploads')

namespace :deploy do
  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      within release_path do
        with rails_env: :production do
          execute :rake, 'assets:precompile'
        end
      end
    end
  end
end
