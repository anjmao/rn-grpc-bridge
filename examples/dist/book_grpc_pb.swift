// package: Book
// file: book.proto

import Foundation
import SwiftGRPC

@objc(BookService)
class BookService: NSObject {

  @objc func GetTypes(_ req: [String: Any], resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
      let svc = Tours_ToursServiceClient(address: "127.0.0.1:50051", secure: false)
      var r = Book_GetTypesRequest()
      r.dbl = req["dbl"] as? Double ?? 0
      r.flt = req["flt"] as? Float ?? 0
      r.intr32 = req["intr32"] as? Int32 ?? 0
      r.intr64 = req["intr64"] as? Int64 ?? 0
      r.uintr32 = req["uintr32"] as? UInt32 ?? 0
      r.uintr64 = req["uintr64"] as? UInt32 ?? 0
      r.suint32 = req["suint32"] as? Int32 ?? 0
      r.suint64 = req["suint64"] as? Int64 ?? 0
      r.fxd32 = req["fxd32"] as? UInt32 ?? 0
      r.fxd64 = req["fxd64"] as? UInt64 ?? 0
      r.sfxd32 = req["sfxd32"] as? Int32 ?? 0
      r.sfxd64 = req["sfxd64"] as? Int64 ?? 0
      r.bln = req["bln"] as? Bool ?? false
      r.str = req["str"] as? String ?? ""
      r.bytx = req["bytx"] as? Data ?? Data()

      do {
        let rsp = try svc.getTours(r)
        var arr = [Any]()
        for item in rsp.items {
          var tmp: [String: Any] = [:]
          tmp["name"] = item.name
          tmp["courseType"] = item.courseType
          tmp["isActive"] = item.isActive
          tmp["duration"] = item.duration
          arr.append(tmp)
        }
        resolve(arr)
      } catch {
        reject("ERROR", error.localizedDescription, error)
      }
  }
  @objc func GetBook(_ req: [String: Any], resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
      let svc = Tours_ToursServiceClient(address: "127.0.0.1:50051", secure: false)
      var r = Book_GetBookRequest()
      r.isbn = req["isbn"] as? Int64 ?? 0

      do {
        let rsp = try svc.getTours(r)
        var arr = [Any]()
        for item in rsp.items {
          var tmp: [String: Any] = [:]
          tmp["name"] = item.name
          tmp["courseType"] = item.courseType
          tmp["isActive"] = item.isActive
          tmp["duration"] = item.duration
          arr.append(tmp)
        }
        resolve(arr)
      } catch {
        reject("ERROR", error.localizedDescription, error)
      }
  }
  @objc func GetBooksViaAuthor(_ req: [String: Any], resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
      let svc = Tours_ToursServiceClient(address: "127.0.0.1:50051", secure: false)
      var r = Book_GetBookViaAuthor()
      r.author = req["author"] as? String ?? ""

      do {
        let rsp = try svc.getTours(r)
        var arr = [Any]()
        for item in rsp.items {
          var tmp: [String: Any] = [:]
          tmp["name"] = item.name
          tmp["courseType"] = item.courseType
          tmp["isActive"] = item.isActive
          tmp["duration"] = item.duration
          arr.append(tmp)
        }
        resolve(arr)
      } catch {
        reject("ERROR", error.localizedDescription, error)
      }
  }
  @objc func GetGreatestBook(_ req: [String: Any], resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
      let svc = Tours_ToursServiceClient(address: "127.0.0.1:50051", secure: false)
      var r = Book_GetBookRequest()
      r.isbn = req["isbn"] as? Int64 ?? 0

      do {
        let rsp = try svc.getTours(r)
        var arr = [Any]()
        for item in rsp.items {
          var tmp: [String: Any] = [:]
          tmp["name"] = item.name
          tmp["courseType"] = item.courseType
          tmp["isActive"] = item.isActive
          tmp["duration"] = item.duration
          arr.append(tmp)
        }
        resolve(arr)
      } catch {
        reject("ERROR", error.localizedDescription, error)
      }
  }
  @objc func GetBooks(_ req: [String: Any], resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
      let svc = Tours_ToursServiceClient(address: "127.0.0.1:50051", secure: false)
      var r = Book_GetBookRequest()
      r.isbn = req["isbn"] as? Int64 ?? 0

      do {
        let rsp = try svc.getTours(r)
        var arr = [Any]()
        for item in rsp.items {
          var tmp: [String: Any] = [:]
          tmp["name"] = item.name
          tmp["courseType"] = item.courseType
          tmp["isActive"] = item.isActive
          tmp["duration"] = item.duration
          arr.append(tmp)
        }
        resolve(arr)
      } catch {
        reject("ERROR", error.localizedDescription, error)
      }
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
