// package: Book
// file: book.proto

import Foundation
import SwiftGRPC

@objc(BookService)
class BookService: NSObject, GrpcService {


  @objc func GetTypes(_ req$: [String: Any], resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let svc = BookServiceClient()
    var req = Book_GetTypesRequest()

    // request mapping
    req.dbl = req$["dbl"] as? Double ?? 0
    req.flt = req$["flt"] as? Float ?? 0
    req.intr32 = Int32(req$["intr32"] as? Int ?? 0)
    req.intr64 = Int64(req$["intr64"] as? Int ?? 0)
    req.uintr32 = UInt32(req$["uintr32"] as? Int ?? 0)
    req.uintr64 = UInt64(req$["uintr64"] as? Int ?? 0)
    req.suint32 = Int32(req$["suint32"] as? Int ?? 0)
    req.suint64 = Int64(req$["suint64"] as? Int ?? 0)
    req.fxd32 = UInt32(req$["fxd32"] as? Int ?? 0)
    req.fxd64 = UInt64(req$["fxd64"] as? Int ?? 0)
    req.sfxd32 = Int32(req$["sfxd32"] as? Int ?? 0)
    req.sfxd64 = Int64(req$["sfxd64"] as? Int ?? 0)
    req.bln = req$["bln"] as? Bool ?? false
    req.str = req$["str"] as? String ?? ""
    req.bytx = req$["bytx"] as? Data ?? Data()
    if let arr = req$["books"] as? [[String: Any]] {
      for item in arr {
        if let books_Book$ = item as? [String: Any] {
          var books_Book = Book()
          books_Book.isbn = Int64(books_Book$["isbn"] as? Int ?? 0)
          books_Book.title = books_Book$["title"] as? String ?? ""
          books_Book.author = books_Book$["author"] as? String ?? ""
          books_Book.pages = Int32(books_Book$["pages"] as? Int ?? 0)
          books_Book.isActivate = books_Book$["isActivate"] as? Bool ?? false
          if let details_BookDetails$ = books_Book$["details"] as? [String: Any] {
            var details_BookDetails = BookDetails()
            details_BookDetails.pages = Int32(details_BookDetails$["pages"] as? Int ?? 0)
            books_Book.details = details_BookDetails
          }
          req.books.append(books_Book)
        }
      }
    }
    if let book_Book$ = item["book"] as? [String: Any] {
      var book_Book = Book()
      book_Book.isbn = Int64(book_Book$["isbn"] as? Int ?? 0)
      book_Book.title = book_Book$["title"] as? String ?? ""
      book_Book.author = book_Book$["author"] as? String ?? ""
      book_Book.pages = Int32(book_Book$["pages"] as? Int ?? 0)
      book_Book.isActivate = book_Book$["isActivate"] as? Bool ?? false
      if let details_BookDetails$ = book_Book$["details"] as? [String: Any] {
        var details_BookDetails = BookDetails()
        details_BookDetails.pages = Int32(details_BookDetails$["pages"] as? Int ?? 0)
        book_Book.details = details_BookDetails
      }
      req.book = book_Book
    }
    // end request mapping

    do {
      let res = try svc.GetTypes(req)
      var res$: [String: Any] = [:]

      // response mapping
      res$["dbl"] = res.dbl
      res$["flt"] = res.flt
      res$["intr32"] = res.intr32
      res$["intr64"] = res.intr64
      res$["uintr32"] = res.uintr32
      res$["uintr64"] = res.uintr64
      res$["suint32"] = res.suint32
      res$["suint64"] = res.suint64
      res$["fxd32"] = res.fxd32
      res$["fxd64"] = res.fxd64
      res$["sfxd32"] = res.sfxd32
      res$["sfxd64"] = res.sfxd64
      res$["bln"] = res.bln
      res$["str"] = res.str
      res$["bytx"] = res.bytx
      var books$: [[String: Any]] = []
      for item in res.books {
        var _books_Book = item
        var _books_Book$: [String: Any] = [:]
        _books_Book$["isbn"] = _books_Book.isbn
        _books_Book$["title"] = _books_Book.title
        _books_Book$["author"] = _books_Book.author
        _books_Book$["pages"] = _books_Book.pages
        _books_Book$["isActivate"] = _books_Book.isActivate
        var _details_BookDetails = _books_Book.details
        var _details_BookDetails$: [String: Any] = [:]
        _details_BookDetails$["pages"] = _details_BookDetails.pages
        _books_Book$["details"] = _details_BookDetails$
        books$.append(_books_Book$)
      }
      res$["books"] = books$
      var _book_Book = res.book
      var _book_Book$: [String: Any] = [:]
      _book_Book$["isbn"] = _book_Book.isbn
      _book_Book$["title"] = _book_Book.title
      _book_Book$["author"] = _book_Book.author
      _book_Book$["pages"] = _book_Book.pages
      _book_Book$["isActivate"] = _book_Book.isActivate
      var _details_BookDetails = _book_Book.details
      var _details_BookDetails$: [String: Any] = [:]
      _details_BookDetails$["pages"] = _details_BookDetails.pages
      _book_Book$["details"] = _details_BookDetails$
      res$["book"] = _book_Book$
      // end response mapping

      resolve(res$)
    } catch {
      reject("ERROR", error.localizedDescription, error)
    }
  }


  @objc func GetBook(_ req$: [String: Any], resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let svc = BookServiceClient()
    var req = Book_GetBookRequest()

    // request mapping
    req.isbn = Int64(req$["isbn"] as? Int ?? 0)
    // end request mapping

    do {
      let res = try svc.GetBook(req)
      var res$: [String: Any] = [:]

      // response mapping
      res$["isbn"] = res.isbn
      // end response mapping

      resolve(res$)
    } catch {
      reject("ERROR", error.localizedDescription, error)
    }
  }


  @objc func GetBooksViaAuthor(_ req$: [String: Any], resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let svc = BookServiceClient()
    var req = Book_GetBookViaAuthor()

    // request mapping
    req.author = req$["author"] as? String ?? ""
    // end request mapping

    do {
      let res = try svc.GetBooksViaAuthor(req)
      var res$: [String: Any] = [:]

      // response mapping
      res$["author"] = res.author
      // end response mapping

      resolve(res$)
    } catch {
      reject("ERROR", error.localizedDescription, error)
    }
  }


  @objc func GetGreatestBook(_ req$: [String: Any], resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let svc = BookServiceClient()
    var req = Book_GetBookRequest()

    // request mapping
    req.isbn = Int64(req$["isbn"] as? Int ?? 0)
    // end request mapping

    do {
      let res = try svc.GetGreatestBook(req)
      var res$: [String: Any] = [:]

      // response mapping
      res$["isbn"] = res.isbn
      // end response mapping

      resolve(res$)
    } catch {
      reject("ERROR", error.localizedDescription, error)
    }
  }


  @objc func GetBooks(_ req$: [String: Any], resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let svc = BookServiceClient()
    var req = Book_GetBookRequest()

    // request mapping
    req.isbn = Int64(req$["isbn"] as? Int ?? 0)
    // end request mapping

    do {
      let res = try svc.GetBooks(req)
      var res$: [String: Any] = [:]

      // response mapping
      res$["isbn"] = res.isbn
      // end response mapping

      resolve(res$)
    } catch {
      reject("ERROR", error.localizedDescription, error)
    }
  }

  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
