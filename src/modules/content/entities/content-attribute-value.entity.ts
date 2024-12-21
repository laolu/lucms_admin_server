import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ContentAttribute } from './content-attribute.entity';
import { ContentAttributeRelation } from './content-attribute-relation.entity';

@Entity('content_attribute_values')
export class ContentAttributeValue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @ManyToOne(() => ContentAttribute, attribute => attribute.values)
  attribute: ContentAttribute;

  @OneToMany(() => ContentAttributeRelation, relation => relation.attributeValue)
  contents: ContentAttributeRelation[];

  @Column({ default: 0 })
  sort: number;

  @Column({ default: true })
  isActive: boolean;
} 