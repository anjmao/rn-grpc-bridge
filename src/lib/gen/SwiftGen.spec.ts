import { genRequestMapping, MappingProto } from './SwiftGenMapping';
import { FieldDescriptorProto } from 'google-protobuf/google/protobuf/descriptor_pb';


describe('SwiftGenMapping', () => {
    it('should generate request mappings', () => {
        const t = FieldDescriptorProto.Type;
        const messages: MappingProto[] = [
            {
                name: 'Root',
                fields: [
                    { type: t.TYPE_STRING, name: 'gender' },
                    { type: t.TYPE_INT32, name: 'age' },
                    { type: t.TYPE_MESSAGE, name: 'book', typeName: 'Book' },
                    { type: t.TYPE_MESSAGE, name: 'books', typeName: 'Book', repeated: true },
                    { type: t.TYPE_STRING, name: 'name' },
                ]
            },
            {
                name: 'Book',
                fields: [
                    { type: t.TYPE_STRING, name: 'name' },
                    { type: t.TYPE_MESSAGE, name: 'details', typeName: 'BookDetails' },
                ]
            },
            {
                name: 'BookDetails',
                fields: [
                    { type: t.TYPE_INT32, name: 'pagesCount' }
                ]
            }
        ];
        const req = genRequestMapping({
            packageName: 'Pkg',
            indent: 0,
            messages: messages,
            message: messages[0],
            root: 'root',
            root$: 'root$'
        });
        console.log(req)
        expect(req).toBeDefined();
    });
});
