//
// DO NOT EDIT.
//
// Generated by the protocol buffer compiler.
// Source: book.proto
//

//
// Copyright 2018, gRPC Authors All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
import Foundation
import Dispatch
import SwiftGRPC
import SwiftProtobuf

internal protocol Book_BooksGetTypesCall: ClientCallUnary {}

fileprivate final class Book_BooksGetTypesCallBase: ClientCallUnaryBase<Book_GetTypesRequest, Book_GetTypesResponse>, Book_BooksGetTypesCall {
  override class var method: String { return "/book.Books/GetTypes" }
}

internal protocol Book_BooksGetBookCall: ClientCallUnary {}

fileprivate final class Book_BooksGetBookCallBase: ClientCallUnaryBase<Book_GetBookRequest, Book_Book>, Book_BooksGetBookCall {
  override class var method: String { return "/book.Books/GetBook" }
}

internal protocol Book_BooksGetBooksViaAuthorCall: ClientCallServerStreaming {
  /// Do not call this directly, call `receive()` in the protocol extension below instead.
  func _receive(timeout: DispatchTime) throws -> Book_Book?
  /// Call this to wait for a result. Nonblocking.
  func receive(completion: @escaping (ResultOrRPCError<Book_Book?>) -> Void) throws
}

internal extension Book_BooksGetBooksViaAuthorCall {
  /// Call this to wait for a result. Blocking.
  func receive(timeout: DispatchTime = .distantFuture) throws -> Book_Book? { return try self._receive(timeout: timeout) }
}

fileprivate final class Book_BooksGetBooksViaAuthorCallBase: ClientCallServerStreamingBase<Book_GetBookViaAuthor, Book_Book>, Book_BooksGetBooksViaAuthorCall {
  override class var method: String { return "/book.Books/GetBooksViaAuthor" }
}

internal protocol Book_BooksGetGreatestBookCall: ClientCallClientStreaming {
  /// Send a message to the stream. Nonblocking.
  func send(_ message: Book_GetBookRequest, completion: @escaping (Error?) -> Void) throws
  /// Do not call this directly, call `send()` in the protocol extension below instead.
  func _send(_ message: Book_GetBookRequest, timeout: DispatchTime) throws

  /// Call this to close the connection and wait for a response. Blocking.
  func closeAndReceive() throws -> Book_Book
  /// Call this to close the connection and wait for a response. Nonblocking.
  func closeAndReceive(completion: @escaping (ResultOrRPCError<Book_Book>) -> Void) throws
}

internal extension Book_BooksGetGreatestBookCall {
  /// Send a message to the stream and wait for the send operation to finish. Blocking.
  func send(_ message: Book_GetBookRequest, timeout: DispatchTime = .distantFuture) throws { try self._send(message, timeout: timeout) }
}

fileprivate final class Book_BooksGetGreatestBookCallBase: ClientCallClientStreamingBase<Book_GetBookRequest, Book_Book>, Book_BooksGetGreatestBookCall {
  override class var method: String { return "/book.Books/GetGreatestBook" }
}

internal protocol Book_BooksGetBooksCall: ClientCallUnary {}

fileprivate final class Book_BooksGetBooksCallBase: ClientCallUnaryBase<Book_GetBookRequest, Book_GetBooksResponse>, Book_BooksGetBooksCall {
  override class var method: String { return "/book.Books/GetBooks" }
}


/// Instantiate Book_BooksServiceClient, then call methods of this protocol to make API calls.
internal protocol Book_BooksService: ServiceClient {
  /// Synchronous. Unary.
  func getTypes(_ request: Book_GetTypesRequest) throws -> Book_GetTypesResponse
  /// Asynchronous. Unary.
  func getTypes(_ request: Book_GetTypesRequest, completion: @escaping (Book_GetTypesResponse?, CallResult) -> Void) throws -> Book_BooksGetTypesCall

  /// Synchronous. Unary.
  func getBook(_ request: Book_GetBookRequest) throws -> Book_Book
  /// Asynchronous. Unary.
  func getBook(_ request: Book_GetBookRequest, completion: @escaping (Book_Book?, CallResult) -> Void) throws -> Book_BooksGetBookCall

  /// Asynchronous. Server-streaming.
  /// Send the initial message.
  /// Use methods on the returned object to get streamed responses.
  func getBooksViaAuthor(_ request: Book_GetBookViaAuthor, completion: ((CallResult) -> Void)?) throws -> Book_BooksGetBooksViaAuthorCall

  /// Asynchronous. Client-streaming.
  /// Use methods on the returned object to stream messages and
  /// to close the connection and wait for a final response.
  func getGreatestBook(completion: ((CallResult) -> Void)?) throws -> Book_BooksGetGreatestBookCall

  /// Synchronous. Unary.
  func getBooks(_ request: Book_GetBookRequest) throws -> Book_GetBooksResponse
  /// Asynchronous. Unary.
  func getBooks(_ request: Book_GetBookRequest, completion: @escaping (Book_GetBooksResponse?, CallResult) -> Void) throws -> Book_BooksGetBooksCall

}

internal final class Book_BooksServiceClient: ServiceClientBase, Book_BooksService {
  /// Synchronous. Unary.
  internal func getTypes(_ request: Book_GetTypesRequest) throws -> Book_GetTypesResponse {
    return try Book_BooksGetTypesCallBase(channel)
      .run(request: request, metadata: metadata)
  }
  /// Asynchronous. Unary.
  internal func getTypes(_ request: Book_GetTypesRequest, completion: @escaping (Book_GetTypesResponse?, CallResult) -> Void) throws -> Book_BooksGetTypesCall {
    return try Book_BooksGetTypesCallBase(channel)
      .start(request: request, metadata: metadata, completion: completion)
  }

  /// Synchronous. Unary.
  internal func getBook(_ request: Book_GetBookRequest) throws -> Book_Book {
    return try Book_BooksGetBookCallBase(channel)
      .run(request: request, metadata: metadata)
  }
  /// Asynchronous. Unary.
  internal func getBook(_ request: Book_GetBookRequest, completion: @escaping (Book_Book?, CallResult) -> Void) throws -> Book_BooksGetBookCall {
    return try Book_BooksGetBookCallBase(channel)
      .start(request: request, metadata: metadata, completion: completion)
  }

  /// Asynchronous. Server-streaming.
  /// Send the initial message.
  /// Use methods on the returned object to get streamed responses.
  internal func getBooksViaAuthor(_ request: Book_GetBookViaAuthor, completion: ((CallResult) -> Void)?) throws -> Book_BooksGetBooksViaAuthorCall {
    return try Book_BooksGetBooksViaAuthorCallBase(channel)
      .start(request: request, metadata: metadata, completion: completion)
  }

  /// Asynchronous. Client-streaming.
  /// Use methods on the returned object to stream messages and
  /// to close the connection and wait for a final response.
  internal func getGreatestBook(completion: ((CallResult) -> Void)?) throws -> Book_BooksGetGreatestBookCall {
    return try Book_BooksGetGreatestBookCallBase(channel)
      .start(metadata: metadata, completion: completion)
  }

  /// Synchronous. Unary.
  internal func getBooks(_ request: Book_GetBookRequest) throws -> Book_GetBooksResponse {
    return try Book_BooksGetBooksCallBase(channel)
      .run(request: request, metadata: metadata)
  }
  /// Asynchronous. Unary.
  internal func getBooks(_ request: Book_GetBookRequest, completion: @escaping (Book_GetBooksResponse?, CallResult) -> Void) throws -> Book_BooksGetBooksCall {
    return try Book_BooksGetBooksCallBase(channel)
      .start(request: request, metadata: metadata, completion: completion)
  }

}

/// To build a server, implement a class that conforms to this protocol.
/// If one of the methods returning `ServerStatus?` returns nil,
/// it is expected that you have already returned a status to the client by means of `session.close`.
internal protocol Book_BooksProvider {
  func getTypes(request: Book_GetTypesRequest, session: Book_BooksGetTypesSession) throws -> Book_GetTypesResponse
  func getBook(request: Book_GetBookRequest, session: Book_BooksGetBookSession) throws -> Book_Book
  func getBooksViaAuthor(request: Book_GetBookViaAuthor, session: Book_BooksGetBooksViaAuthorSession) throws -> ServerStatus?
  func getGreatestBook(session: Book_BooksGetGreatestBookSession) throws -> Book_Book?
  func getBooks(request: Book_GetBookRequest, session: Book_BooksGetBooksSession) throws -> Book_GetBooksResponse
}

internal protocol Book_BooksGetTypesSession: ServerSessionUnary {}

fileprivate final class Book_BooksGetTypesSessionBase: ServerSessionUnaryBase<Book_GetTypesRequest, Book_GetTypesResponse>, Book_BooksGetTypesSession {}

internal protocol Book_BooksGetBookSession: ServerSessionUnary {}

fileprivate final class Book_BooksGetBookSessionBase: ServerSessionUnaryBase<Book_GetBookRequest, Book_Book>, Book_BooksGetBookSession {}

internal protocol Book_BooksGetBooksViaAuthorSession: ServerSessionServerStreaming {
  /// Send a message to the stream. Nonblocking.
  func send(_ message: Book_Book, completion: @escaping (Error?) -> Void) throws
  /// Do not call this directly, call `send()` in the protocol extension below instead.
  func _send(_ message: Book_Book, timeout: DispatchTime) throws

  /// Close the connection and send the status. Non-blocking.
  /// This method should be called if and only if your request handler returns a nil value instead of a server status;
  /// otherwise SwiftGRPC will take care of sending the status for you.
  func close(withStatus status: ServerStatus, completion: (() -> Void)?) throws
}

internal extension Book_BooksGetBooksViaAuthorSession {
  /// Send a message to the stream and wait for the send operation to finish. Blocking.
  func send(_ message: Book_Book, timeout: DispatchTime = .distantFuture) throws { try self._send(message, timeout: timeout) }
}

fileprivate final class Book_BooksGetBooksViaAuthorSessionBase: ServerSessionServerStreamingBase<Book_GetBookViaAuthor, Book_Book>, Book_BooksGetBooksViaAuthorSession {}

internal protocol Book_BooksGetGreatestBookSession: ServerSessionClientStreaming {
  /// Do not call this directly, call `receive()` in the protocol extension below instead.
  func _receive(timeout: DispatchTime) throws -> Book_GetBookRequest?
  /// Call this to wait for a result. Nonblocking.
  func receive(completion: @escaping (ResultOrRPCError<Book_GetBookRequest?>) -> Void) throws

  /// Exactly one of these two methods should be called if and only if your request handler returns nil;
  /// otherwise SwiftGRPC will take care of sending the response and status for you.
  /// Close the connection and send a single result. Non-blocking.
  func sendAndClose(response: Book_Book, status: ServerStatus, completion: (() -> Void)?) throws
  /// Close the connection and send an error. Non-blocking.
  /// Use this method if you encountered an error that makes it impossible to send a response.
  /// Accordingly, it does not make sense to call this method with a status of `.ok`.
  func sendErrorAndClose(status: ServerStatus, completion: (() -> Void)?) throws
}

internal extension Book_BooksGetGreatestBookSession {
  /// Call this to wait for a result. Blocking.
  func receive(timeout: DispatchTime = .distantFuture) throws -> Book_GetBookRequest? { return try self._receive(timeout: timeout) }
}

fileprivate final class Book_BooksGetGreatestBookSessionBase: ServerSessionClientStreamingBase<Book_GetBookRequest, Book_Book>, Book_BooksGetGreatestBookSession {}

internal protocol Book_BooksGetBooksSession: ServerSessionUnary {}

fileprivate final class Book_BooksGetBooksSessionBase: ServerSessionUnaryBase<Book_GetBookRequest, Book_GetBooksResponse>, Book_BooksGetBooksSession {}


/// Main server for generated service
internal final class Book_BooksServer: ServiceServer {
  private let provider: Book_BooksProvider

  internal init(address: String, provider: Book_BooksProvider) {
    self.provider = provider
    super.init(address: address)
  }

  internal init?(address: String, certificateURL: URL, keyURL: URL, provider: Book_BooksProvider) {
    self.provider = provider
    super.init(address: address, certificateURL: certificateURL, keyURL: keyURL)
  }

  internal init?(address: String, certificateString: String, keyString: String, provider: Book_BooksProvider) {
    self.provider = provider
    super.init(address: address, certificateString: certificateString, keyString: keyString)
  }

  /// Determines and calls the appropriate request handler, depending on the request's method.
  /// Throws `HandleMethodError.unknownMethod` for methods not handled by this service.
  internal override func handleMethod(_ method: String, handler: Handler) throws -> ServerStatus? {
    let provider = self.provider
    switch method {
    case "/book.Books/GetTypes":
      return try Book_BooksGetTypesSessionBase(
        handler: handler,
        providerBlock: { try provider.getTypes(request: $0, session: $1 as! Book_BooksGetTypesSessionBase) })
          .run()
    case "/book.Books/GetBook":
      return try Book_BooksGetBookSessionBase(
        handler: handler,
        providerBlock: { try provider.getBook(request: $0, session: $1 as! Book_BooksGetBookSessionBase) })
          .run()
    case "/book.Books/GetBooksViaAuthor":
      return try Book_BooksGetBooksViaAuthorSessionBase(
        handler: handler,
        providerBlock: { try provider.getBooksViaAuthor(request: $0, session: $1 as! Book_BooksGetBooksViaAuthorSessionBase) })
          .run()
    case "/book.Books/GetGreatestBook":
      return try Book_BooksGetGreatestBookSessionBase(
        handler: handler,
        providerBlock: { try provider.getGreatestBook(session: $0 as! Book_BooksGetGreatestBookSessionBase) })
          .run()
    case "/book.Books/GetBooks":
      return try Book_BooksGetBooksSessionBase(
        handler: handler,
        providerBlock: { try provider.getBooks(request: $0, session: $1 as! Book_BooksGetBooksSessionBase) })
          .run()
    default:
      throw HandleMethodError.unknownMethod
    }
  }
}

