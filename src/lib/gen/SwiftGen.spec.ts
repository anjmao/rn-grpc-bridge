import { gen } from './SwiftGen';
import { FieldDescriptorProto } from 'google-protobuf/google/protobuf/descriptor_pb';

describe('SwiftGen', () => {
    it('should generate', () => {
        const descriptor = {
            getName: () => 'books.proto',
            getPackage: () => 'books',
            getServiceList: () => ([
                {   
                    getName: () => 'booksService',
                    getMethodList: () => ([
                        {
                            getInputType: () => '.books.GetBookRequest',
                            getOutputType: () => '.books.GetBookReply',
                            getName: () => 'getBooks',
                            getClientStreaming: () => false,
                            getServerStreaming: () => false,
                        }
                    ])
                }
            ]),
            getMessageTypeList: () => ([
                {
                    getName: () => 'GetBookRequest',
                    getFieldList: () => ([
                        {
                            getName: () => 'name',
                            getTypeName: () => '',
                            getType: () => FieldDescriptorProto.Type.TYPE_STRING,
                            getLabel: () => FieldDescriptorProto.Label.LABEL_REPEATED
                        },
                        {
                            getName: () => 'book',
                            getTypeName: () => '.book.Book',
                            getType: () => FieldDescriptorProto.Type.TYPE_STRING,
                            getLabel: () => FieldDescriptorProto.Label.LABEL_REPEATED
                        }
                    ]),
                },
                {
                    getName: () => 'Book',
                    getFieldList: () => ([
                        {
                            getName: () => 'name',
                            getTypeName: () => '',
                            getType: () => FieldDescriptorProto.Type.TYPE_STRING,
                            getLabel: () => FieldDescriptorProto.Label.LABEL_REPEATED
                        }
                    ])
                },
                {
                    getName: () => 'GetBookReply',
                    getFieldList: () => ([
                        {
                            getName: () => 'name',
                            getTypeName: () => '',
                            getType: () => FieldDescriptorProto.Type.TYPE_STRING,
                            getLabel: () => FieldDescriptorProto.Label.LABEL_REPEATED
                        },
                        {
                            getName: () => 'book',
                            getTypeName: () => '.book.Book',
                            getType: () => FieldDescriptorProto.Type.TYPE_STRING,
                            getLabel: () => FieldDescriptorProto.Label.LABEL_REPEATED
                        }
                    ]),
                }
            ])
        };
        const res = gen(<any>descriptor);
        expect(res).toBeDefined();
    });
});
