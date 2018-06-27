// package: book
// file: book.proto

/* tslint:disable */

import * as jspb from 'google-protobuf';

export class Book extends jspb.Message { 
    getIsbn(): number;
    setIsbn(value: number): void;

    getTitle(): string;
    setTitle(value: string): void;

    getAuthor(): string;
    setAuthor(value: string): void;

    getPages(): number;
    setPages(value: number): void;

    getIsactivate(): boolean;
    setIsactivate(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Book.AsObject;
    static toObject(includeInstance: boolean, msg: Book): Book.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Book, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Book;
    static deserializeBinaryFromReader(message: Book, reader: jspb.BinaryReader): Book;
}

export namespace Book {
    export type AsObject = {
        isbn: number,
        title: string,
        author: string,
        pages: number,
        isactivate: boolean,
    }
}

export class GetBookRequest extends jspb.Message { 
    getIsbn(): number;
    setIsbn(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetBookRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetBookRequest): GetBookRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetBookRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetBookRequest;
    static deserializeBinaryFromReader(message: GetBookRequest, reader: jspb.BinaryReader): GetBookRequest;
}

export namespace GetBookRequest {
    export type AsObject = {
        isbn: number,
    }
}

export class GetBooksResponse extends jspb.Message { 
    clearItemsList(): void;
    getItemsList(): Array<Book>;
    setItemsList(value: Array<Book>): void;
    addItems(value?: Book, index?: number): Book;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetBooksResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetBooksResponse): GetBooksResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetBooksResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetBooksResponse;
    static deserializeBinaryFromReader(message: GetBooksResponse, reader: jspb.BinaryReader): GetBooksResponse;
}

export namespace GetBooksResponse {
    export type AsObject = {
        itemsList: Array<Book.AsObject>,
    }
}

export class GetBookViaAuthor extends jspb.Message { 
    getAuthor(): string;
    setAuthor(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetBookViaAuthor.AsObject;
    static toObject(includeInstance: boolean, msg: GetBookViaAuthor): GetBookViaAuthor.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetBookViaAuthor, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetBookViaAuthor;
    static deserializeBinaryFromReader(message: GetBookViaAuthor, reader: jspb.BinaryReader): GetBookViaAuthor;
}

export namespace GetBookViaAuthor {
    export type AsObject = {
        author: string,
    }
}

export class GetTypesRequest extends jspb.Message { 
    getDbl(): number;
    setDbl(value: number): void;

    getFlt(): number;
    setFlt(value: number): void;

    getIntr32(): number;
    setIntr32(value: number): void;

    getIntr64(): number;
    setIntr64(value: number): void;

    getUintr32(): number;
    setUintr32(value: number): void;

    getUintr64(): number;
    setUintr64(value: number): void;

    getSuint32(): number;
    setSuint32(value: number): void;

    getSuint64(): number;
    setSuint64(value: number): void;

    getFxd32(): number;
    setFxd32(value: number): void;

    getFxd64(): number;
    setFxd64(value: number): void;

    getSfxd32(): number;
    setSfxd32(value: number): void;

    getSfxd64(): number;
    setSfxd64(value: number): void;

    getBln(): boolean;
    setBln(value: boolean): void;

    getStr(): string;
    setStr(value: string): void;

    getBytx(): Uint8Array | string;
    getBytx_asU8(): Uint8Array;
    getBytx_asB64(): string;
    setBytx(value: Uint8Array | string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetTypesRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetTypesRequest): GetTypesRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetTypesRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetTypesRequest;
    static deserializeBinaryFromReader(message: GetTypesRequest, reader: jspb.BinaryReader): GetTypesRequest;
}

export namespace GetTypesRequest {
    export type AsObject = {
        dbl: number,
        flt: number,
        intr32: number,
        intr64: number,
        uintr32: number,
        uintr64: number,
        suint32: number,
        suint64: number,
        fxd32: number,
        fxd64: number,
        sfxd32: number,
        sfxd64: number,
        bln: boolean,
        str: string,
        bytx: Uint8Array | string,
    }
}

export class GetTypesResponse extends jspb.Message { 
    getDbl(): number;
    setDbl(value: number): void;

    getFlt(): number;
    setFlt(value: number): void;

    getIntr32(): number;
    setIntr32(value: number): void;

    getIntr64(): number;
    setIntr64(value: number): void;

    getUintr32(): number;
    setUintr32(value: number): void;

    getUintr64(): number;
    setUintr64(value: number): void;

    getSuint32(): number;
    setSuint32(value: number): void;

    getSuint64(): number;
    setSuint64(value: number): void;

    getFxd32(): number;
    setFxd32(value: number): void;

    getFxd64(): number;
    setFxd64(value: number): void;

    getSfxd32(): number;
    setSfxd32(value: number): void;

    getSfxd64(): number;
    setSfxd64(value: number): void;

    getBln(): boolean;
    setBln(value: boolean): void;

    getStr(): string;
    setStr(value: string): void;

    getBytx(): Uint8Array | string;
    getBytx_asU8(): Uint8Array;
    getBytx_asB64(): string;
    setBytx(value: Uint8Array | string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetTypesResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetTypesResponse): GetTypesResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetTypesResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetTypesResponse;
    static deserializeBinaryFromReader(message: GetTypesResponse, reader: jspb.BinaryReader): GetTypesResponse;
}

export namespace GetTypesResponse {
    export type AsObject = {
        dbl: number,
        flt: number,
        intr32: number,
        intr64: number,
        uintr32: number,
        uintr64: number,
        suint32: number,
        suint64: number,
        fxd32: number,
        fxd64: number,
        sfxd32: number,
        sfxd64: number,
        bln: boolean,
        str: string,
        bytx: Uint8Array | string,
    }
}

export class BookStore extends jspb.Message { 
    getName(): string;
    setName(value: string): void;


    getBooksMap(): jspb.Map<number, string>;
    clearBooksMap(): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BookStore.AsObject;
    static toObject(includeInstance: boolean, msg: BookStore): BookStore.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BookStore, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BookStore;
    static deserializeBinaryFromReader(message: BookStore, reader: jspb.BinaryReader): BookStore;
}

export namespace BookStore {
    export type AsObject = {
        name: string,

        booksMap: Array<[number, string]>,
    }
}

export class SpecialCases extends jspb.Message { 
    getNormal(): string;
    setNormal(value: string): void;

    getDefault(): string;
    setDefault(value: string): void;

    getFunction(): string;
    setFunction(value: string): void;

    getVar(): string;
    setVar(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SpecialCases.AsObject;
    static toObject(includeInstance: boolean, msg: SpecialCases): SpecialCases.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SpecialCases, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SpecialCases;
    static deserializeBinaryFromReader(message: SpecialCases, reader: jspb.BinaryReader): SpecialCases;
}

export namespace SpecialCases {
    export type AsObject = {
        normal: string,
        pb_default: string,
        pb_function: string,
        pb_var: string,
    }
}

export enum EnumSample {
    UNKNOWN = 0,
    STARTED = 1,
    RUNNING = 1,
}
