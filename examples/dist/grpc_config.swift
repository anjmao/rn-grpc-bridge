import UIKit
import SwiftGRPC

@objc(GrpcConfig)
class GrpcConfig: NSObject {
  static var BooksClient: Book_BooksServiceClient? = nil
  static var DebugClient: Debug_DebugServiceClient? = nil

  @objc func initServices(_ apiUrl: String, secure: Bool, certFile: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    if (certFile == "") {
      GrpcConfig.BooksClient = Book_BooksServiceClient(address: apiUrl, secure: secure)
      GrpcConfig.DebugClient = Debug_DebugServiceClient(address: apiUrl, secure: secure)
      resolve(true)
      return
    }
    let certificateURL = Bundle.main.url(forResource: certFile, withExtension: "crt")!
    let certificates = try! String(contentsOf: certificateURL, encoding: .utf8)
    GrpcConfig.BooksClient = Book_BooksServiceClient(address: apiUrl, certificates: certificates)
    GrpcConfig.DebugClient = Debug_DebugServiceClient(address: apiUrl, certificates: certificates)
    resolve(true)
  }
  
  @objc func setMetadata(_ jsMetadata: [String: String], resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let metadata = try! Metadata(jsMetadata)
    GrpcConfig.BooksClient?.metadata = metadata
    GrpcConfig.DebugClient?.metadata = metadata
    resolve(true)
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
