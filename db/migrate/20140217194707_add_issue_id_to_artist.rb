class AddIssueIdToArtist < ActiveRecord::Migration
  def change
    add_column :artists, :issue_id, :integer
  end
end
