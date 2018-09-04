class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @count_now = params[:count].to_i
    @count_db = Message.where(group_id: @group).count
    if @count_now != @count_db
      @changes = @count_db - @count_now
      @messages = @group.messages.order(created_at: :DESC).includes(:user).limit(@changes) 
      @messages = @messages.sort { |a, b| a.id <=> b.id }
    end
    respond_to do |format|
      format.html {@messages = @group.messages.includes(:user)}
      format.json
    end
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path(@group)}
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      redirect_to group_messages_path(@group)
    end
  end
  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end