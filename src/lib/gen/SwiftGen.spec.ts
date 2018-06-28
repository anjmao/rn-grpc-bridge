import { gen } from './SwiftGen';
import { FieldDescriptorProto, FileDescriptorProto } from 'google-protobuf/google/protobuf/descriptor_pb';

type PartialMock<T> = {
    [P in keyof T]?: jest.Mock<T>;
};

describe('SwiftGen', () => {
    fit('should generate', () => {
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
                            getType: () => FieldDescriptorProto.Type.TYPE_STRING,
                            getLabel: () => FieldDescriptorProto.Label.LABEL_REPEATED
                        }
                    ])
                },
                {
                    getName: () => 'GetBookReply'
                }
            ])
        };
        const res = gen(<any>descriptor);
        expect(res).toBeDefined();
    });
});
