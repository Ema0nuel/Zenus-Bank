-- Add status column to cards table
-- Status values: 'pending', 'approved', 'declined', 'issued'

ALTER TABLE cards 
ADD COLUMN status TEXT DEFAULT 'pending';

-- Create an index for faster filtering by status
CREATE INDEX idx_cards_status ON cards(status);

-- Optional: Add a check constraint to ensure valid status values
ALTER TABLE cards 
ADD CONSTRAINT cards_status_check CHECK (status IN ('pending', 'approved', 'declined', 'issued'));
