// package: Book
// file: book.proto

import Foundation
import SwiftGRPC

@objc(BookService)
class BookService: NSObject, GrpcService {


  @objc func GetTypes(_ req: [String: Any], resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let svc = BookServiceClient()
    var root = Book_GetTypesRequest()
// ----request mapping---- 
root.intr32 = Int32(root$["intr32"] as? Int ?? 0)
root.suint32 = Int32(root$["suint32"] as? Int ?? 0)
root.sfxd32 = Int32(root$["sfxd32"] as? Int ?? 0)
root.str = String(describing: root$["str"])
if let arr = root$["books"] as? [[String: Any]] {
  for item in arr {
    if let books_Book$ = item as? [String: Any] {
      var books_Book = Book()
      root.books.append(books_Book)
    }
  }
}
if let book_Book$ = root$["book"] as? [String: Any] {
  var book_Book = Book()
  root.book = book_Book
}
// ----end request mapping----
    do {
      let rsp = try svc.GetTypes(r)
      var res: [String: Any] = [:]
      resolve(res)
    } catch {
      reject("ERROR", error.localizedDescription, error)
    }
  }


  @objc func GetBook(_ req: [String: Any], resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let svc = BookServiceClient()
    var root = Book_GetBookRequest()
// ----request mapping---- 

// ----end request mapping----
    do {
      let rsp = try svc.GetBook(r)
      var res: [String: Any] = [:]
      resolve(res)
    } catch {
      reject("ERROR", error.localizedDescription, error)
    }
  }


  @objc func GetBooksViaAuthor(_ req: [String: Any], resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let svc = BookServiceClient()
    var root = Book_GetBookViaAuthor()
// ----request mapping---- 
root.author = String(describing: root$["author"])
// ----end request mapping----
    do {
      let rsp = try svc.GetBooksViaAuthor(r)
      var res: [String: Any] = [:]
      resolve(res)
    } catch {
      reject("ERROR", error.localizedDescription, error)
    }
  }


  @objc func GetGreatestBook(_ req: [String: Any], resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let svc = BookServiceClient()
    var root = Book_GetBookRequest()
// ----request mapping---- 

// ----end request mapping----
    do {
      let rsp = try svc.GetGreatestBook(r)
      var res: [String: Any] = [:]
      resolve(res)
    } catch {
      reject("ERROR", error.localizedDescription, error)
    }
  }


  @objc func GetBooks(_ req: [String: Any], resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let svc = BookServiceClient()
    var root = Book_GetBookRequest()
// ----request mapping---- 

// ----end request mapping----
    do {
      let rsp = try svc.GetBooks(r)
      var res: [String: Any] = [:]
      resolve(res)
    } catch {
      reject("ERROR", error.localizedDescription, error)
    }
  }

  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
