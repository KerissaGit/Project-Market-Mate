"""groceries test2

Revision ID: 935308c48767
Revises: a60972e9e867
Create Date: 2025-04-24 15:49:33.177960

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '935308c48767'
down_revision = 'a60972e9e867'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('delis', schema=None) as batch_op:
        batch_op.add_column(sa.Column('extras', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('delis', schema=None) as batch_op:
        batch_op.drop_column('extras')

    # ### end Alembic commands ###
