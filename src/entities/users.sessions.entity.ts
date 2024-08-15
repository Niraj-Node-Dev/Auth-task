import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Users } from './users.entity';

@Table({
  tableName: 'user_sessions',
  timestamps: true,
  updatedAt: false,
})
export class UserSessions extends Model{
  @Column({
    type: DataType.UUID,
    unique: true,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  user_id: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  jwt_token: string;

  @CreatedAt
  created_at: Date;

  @BelongsTo(() => Users)
  user: Users;
}
