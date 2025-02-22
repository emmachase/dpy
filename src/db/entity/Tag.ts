import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Upload } from "./Upload";

// Avoid circular dependency issue with Bun
// See: https://github.com/oven-sh/bun/issues/2927
type UploadEntity = Upload;

@Entity()
export class Tag {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Upload, upload => upload.tags, {nullable: false})
    upload: UploadEntity;

    @Column()
    value: string;

}
