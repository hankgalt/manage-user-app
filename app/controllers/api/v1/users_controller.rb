module Api::V1
  class UsersController < ApplicationController
    before_action :authenticate_user, :except => [:sign_up]
    before_action :set_user, only: [:show, :update, :destroy]

    # GET /users
    def index
      @users = User.where(admin_user_id: current_user.id)

      render json: @users
    end

    # GET /users/1
    def show
      render json: @user
    end

    # POST /users
    def sign_up
      @user = User.new(user_params)
      @user.role = 'admin'

      if @user.save
        render json: @user, status: :created
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end

    # POST /users
    def create
      @user = User.new(user_params)
      @user.admin_user_id = current_user.id

      if @user.save
        render json: @user, status: :created
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /users/1
    def update
      @user = User.find(params[:id])

      if @user.update(user_params)
        render json: @user
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end

    # DELETE /users/1
    def destroy
      @user = User.find(params[:id])
      if @user.destroy
        head :no_content, status: :ok
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end

    def current
      current_user.update_columns(last_login: Time.now)
      render json: current_user
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_user
        @user = User.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def user_params
        params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :admin_user)
      end

      def authorize
        return_unauthorized unless current_user && current_user.can_modify_user?(params[:id])
      end
  end
end
