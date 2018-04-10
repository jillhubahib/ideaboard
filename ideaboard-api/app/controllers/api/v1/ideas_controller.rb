module Api::V1
  class IdeasController < ApplicationController
    def index
      ideas = Idea.order("created_at desc")
      render json: ideas
    end
  end
end
