class MessagesController < ApplicationController

  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = Message.new(message_params)
    if @message.save
      redirect_to group_messages_path
    else
      notice: "メッセージを入力してください"
    end
  end

  private

  def set_group
    @group = Group.find(params[:group_id])
  end

  def message_params
    paramas.require(:message).permit(:text,:image)
  end
end
