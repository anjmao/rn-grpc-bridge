import { genRequestFields, MappingProto, genResponseMappings } from './SwiftGenMapping';
import { FieldDescriptorProto } from 'google-protobuf/google/protobuf/descriptor_pb';


describe('SwiftGenMapping', () => {
    it('should generate request mappings', () => {
        const t = FieldDescriptorProto.Type;
        const messages: MappingProto[] = [
            {
                name: 'Root',
                fields: [
                    { type: t.TYPE_STRING, name: 'gender', jsName: 'gender' },
                    { type: t.TYPE_INT32, name: 'age', jsName: 'age' },
                    { type: t.TYPE_INT64, name: 'int64', jsName: 'int64' },
                    { type: t.TYPE_BOOL, name: 'bool', jsName: 'bool' },
                    { type: t.TYPE_DOUBLE, name: 'double', jsName: 'double' },
                    { type: t.TYPE_FIXED32, name: 'fixed32', jsName: 'fixed32' },
                    { type: t.TYPE_FIXED64, name: 'fixed64', jsName: 'fixed64' },
                    { type: t.TYPE_FLOAT, name: 'float', jsName: 'float' },
                    { type: t.TYPE_UINT32, name: 'uint32', jsName: 'uint32' },
                    { type: t.TYPE_UINT64, name: 'uint64', jsName: 'uint64' },
                    { type: t.TYPE_SFIXED32, name: 'sfixed32', jsName: 'sfixed32' },
                    { type: t.TYPE_SFIXED64, name: 'sfixed64', jsName: 'sfixed64' },
                    { type: t.TYPE_SINT32, name: 'sint32', jsName: 'sint32' },
                    { type: t.TYPE_SINT64, name: 'sint64', jsName: 'sint64' },
                    { type: t.TYPE_MESSAGE, name: 'book', jsName: 'book', typeName: 'Book' },
                    { type: t.TYPE_MESSAGE, name: 'books', jsName: 'books', typeName: 'Book', repeated: true },
                    { type: t.TYPE_STRING, name: 'name', jsName: 'name' },
                ]
            },
            {
                name: 'Book',
                fields: [
                    { type: t.TYPE_STRING, name: 'name', jsName: 'name' },
                    { type: t.TYPE_MESSAGE, name: 'details', jsName: 'details', typeName: 'BookDetails' },
                ]
            },
            {
                name: 'BookDetails',
                fields: [
                    { type: t.TYPE_INT32, name: 'pagesCount', jsName: 'pagesCount' }
                ]
            }
        ];
        const req = genRequestFields({
            packageName: 'Pkg',
            indent: 0,
            messages: messages,
            message: messages[0],
            mapTo: 'root',
            mapFrom: 'root$'
        });
        console.log(req.join('\n'))
        expect(req).toBeDefined();
    });

    it('should generate response mappings', () => {
        const t = FieldDescriptorProto.Type;
        const messages: MappingProto[] = [
            {
                name: 'Root',
                fields: [
                    { type: t.TYPE_STRING, name: 'gender', jsName: 'gender' },
                    { type: t.TYPE_INT32, name: 'age', jsName: 'age' },
                    { type: t.TYPE_INT64, name: 'int64', jsName: 'int64' },
                    { type: t.TYPE_BOOL, name: 'bool', jsName: 'bool' },
                    { type: t.TYPE_DOUBLE, name: 'double', jsName: 'double' },
                    { type: t.TYPE_FIXED32, name: 'fixed32', jsName: 'fixed32' },
                    { type: t.TYPE_FIXED64, name: 'fixed64', jsName: 'fixed64' },
                    { type: t.TYPE_FLOAT, name: 'float', jsName: 'float' },
                    { type: t.TYPE_UINT32, name: 'uint32', jsName: 'uint32' },
                    { type: t.TYPE_UINT64, name: 'uint64', jsName: 'uint64' },
                    { type: t.TYPE_SFIXED32, name: 'sfixed32', jsName: 'sfixed32' },
                    { type: t.TYPE_SFIXED64, name: 'sfixed64', jsName: 'sfixed64' },
                    { type: t.TYPE_SINT32, name: 'sint32', jsName: 'sint32' },
                    { type: t.TYPE_SINT64, name: 'sint64', jsName: 'sint64' },
                    { type: t.TYPE_MESSAGE, name: 'book', jsName: 'book', typeName: 'Book' },
                    { type: t.TYPE_MESSAGE, name: 'books', jsName: 'books', typeName: 'Book', repeated: true },
                    { type: t.TYPE_STRING, name: 'name', jsName: 'name' },
                ]
            },
            {
                name: 'Book',
                fields: [
                    { type: t.TYPE_STRING, name: 'name', jsName: 'name' },
                    { type: t.TYPE_MESSAGE, name: 'details', jsName: 'details', typeName: 'BookDetails' },
                ]
            },
            {
                name: 'BookDetails',
                fields: [
                    { type: t.TYPE_INT32, name: 'pagesCount', jsName: 'pagesCount' }
                ]
            }
        ];

        const req = genResponseMappings({
            indent: 0,
            messages: messages,
            message: messages[0],
            mapFrom: 'res',
            mapTo: 'res$'
        });
        console.log(req.join('\n'))
        expect(req).toBeDefined();
    });
});
