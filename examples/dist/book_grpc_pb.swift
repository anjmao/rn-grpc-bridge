// package: Book
// file: book.proto

import Foundation
import SwiftGRPC

@objc(BookService)
class BookService: NSObject {

  @objc func GetTypes(_ req: [String: Any], resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let svc = Tours_ToursServiceClient(address: "127.0.0.1:50051", secure: false)
    var r = Book_GetTypesRequest()

    do {
      let rsp = try svc.GetTypes(r)
      var res: [String: Any] = [:]
      resolve(res)
    } catch {
      reject("ERROR", error.localizedDescription, error)
    }
  }
  @objc func GetBook(_ req: [String: Any], resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let svc = Tours_ToursServiceClient(address: "127.0.0.1:50051", secure: false)
    var r = Book_GetBookRequest()

    do {
      let rsp = try svc.GetBook(r)
      var res: [String: Any] = [:]
      resolve(res)
    } catch {
      reject("ERROR", error.localizedDescription, error)
    }
  }
  @objc func GetBooksViaAuthor(_ req: [String: Any], resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let svc = Tours_ToursServiceClient(address: "127.0.0.1:50051", secure: false)
    var r = Book_GetBookViaAuthor()

    do {
      let rsp = try svc.GetBooksViaAuthor(r)
      var res: [String: Any] = [:]
      resolve(res)
    } catch {
      reject("ERROR", error.localizedDescription, error)
    }
  }
  @objc func GetGreatestBook(_ req: [String: Any], resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let svc = Tours_ToursServiceClient(address: "127.0.0.1:50051", secure: false)
    var r = Book_GetBookRequest()

    do {
      let rsp = try svc.GetGreatestBook(r)
      var res: [String: Any] = [:]
      resolve(res)
    } catch {
      reject("ERROR", error.localizedDescription, error)
    }
  }
  @objc func GetBooks(_ req: [String: Any], resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let svc = Tours_ToursServiceClient(address: "127.0.0.1:50051", secure: false)
    var r = Book_GetBookRequest()

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
