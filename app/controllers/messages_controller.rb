class MessagesController < ApplicationController

  before_action :set_group_users

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create

    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  private

  def set_group_users
    @group = Group.find(params[:group_id])
    @users = @group.users
  end

  def message_params
    params.require(:message).permit(:text,:image).merge(user_id: current_user.id)
  end
end



#〜省略〜


