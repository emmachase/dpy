import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Upload } from "./Upload";

@Entity()
export class Tag {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Upload, upload => upload.tags, {nullable: false})
    upload: Upload;

    @Column()
    value: string;

}
