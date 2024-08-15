import { Column, CreatedAt, DataType, DeletedAt, Model, Table, UpdatedAt } from 'sequelize-typescript';

export enum RegistrationType {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN'
}

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true,
})
export class Users extends Model {
  @Column({
    type: DataType.UUID,
    unique: true,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING(30),
  })
  first_name: string;

  @Column({
    type: DataType.STRING(30),
  })
  last_name: string;

  @Column({
    type: DataType.STRING(255),
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING(255),
  })
  password: string;

  @Column({
    type: DataType.ENUM,
    values: Object.values(RegistrationType),
    allowNull: false,
  })
  role: string;

  @Column({
    type: DataType.STRING(30),
    allowNull: true,
  })
  verification_token: string | null;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_verified: boolean

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;
}
