import { genRequestFields, MappingProto } from './SwiftGenMapping';
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
                    { type: t.TYPE_INT64, name: 'int64' },
                    { type: t.TYPE_BOOL, name: 'bool' },
                    { type: t.TYPE_DOUBLE, name: 'double' },
                    { type: t.TYPE_FIXED32, name: 'fixed32' },
                    { type: t.TYPE_FIXED64, name: 'fixed64' },
                    { type: t.TYPE_FLOAT, name: 'float' },
                    { type: t.TYPE_UINT32, name: 'uint32' },
                    { type: t.TYPE_UINT64, name: 'uint64' },
                    { type: t.TYPE_SFIXED32, name: 'sfixed32' },
                    { type: t.TYPE_SFIXED64, name: 'sfixed64' },
                    { type: t.TYPE_SINT32, name: 'sint32' },
                    { type: t.TYPE_SINT64, name: 'sint64' },
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
        const req = genRequestFields({
            packageName: 'Pkg',
            indent: 0,
            messages: messages,
            message: messages[0],
            root: 'root',
            root$: 'root$'
        });
        console.log(req.join('\n'))
        expect(req).toBeDefined();
    });
});
