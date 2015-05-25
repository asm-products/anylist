class Api::V1::ListsController < Api::V1::ApplicationController
  before_action :set_list, only: [:show, :edit, :update, :destroy]
  before_action :authenticate!, except: [:index, :show]

  def index
    @lists = List.all

    render json: @lists
  end

  def show
    render json: @list
  end

  def create
    @list = List.new(list_params)
    @list.user = current_user

    if @list.save
      render json: @list
    else
      head :unprocessable_entity
    end
  end

  def update
    if @list.update(list_params)
      render json: @list
    else
      head :unprocessable_entity
    end
  end

  def destroy
    @list.destroy

    head :ok
  end

  private
    def set_list
      @list = List.find(params[:id])
    end

    def list_params
      params.require(:list).permit(:title, :items_attributes => [:title])
    end
end
