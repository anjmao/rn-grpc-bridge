// Autogenerated. Do not modify!
// package: Book
// file: book.proto

import Foundation
import SwiftGRPC

@objc(BooksService)
class BooksService: GrpcService {


  @objc func getTypes(_ jsReq: [String: Any], resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let svc = BooksGrpcClient
    var req = Book_GetTypesRequest()

    // request mapping
    req.dbl = jsReq["dbl"] as? Double ?? 0
    req.flt = jsReq["flt"] as? Float ?? 0
    req.intr32 = Int32(jsReq["intr32"] as? Int ?? 0)
    req.intr64 = Int64(jsReq["intr64"] as? Int ?? 0)
    req.uintr32 = UInt32(jsReq["uintr32"] as? Int ?? 0)
    req.uintr64 = UInt64(jsReq["uintr64"] as? Int ?? 0)
    req.suint32 = Int32(jsReq["suint32"] as? Int ?? 0)
    req.suint64 = Int64(jsReq["suint64"] as? Int ?? 0)
    req.fxd32 = UInt32(jsReq["fxd32"] as? Int ?? 0)
    req.fxd64 = UInt64(jsReq["fxd64"] as? Int ?? 0)
    req.sfxd32 = Int32(jsReq["sfxd32"] as? Int ?? 0)
    req.sfxd64 = Int64(jsReq["sfxd64"] as? Int ?? 0)
    req.bln = jsReq["bln"] as? Bool ?? false
    req.str = jsReq["str"] as? String ?? ""
    req.bytx = jsReq["bytx"] as? Data ?? Data()
    if let arr = jsReq["books"] as? [[String: Any]] {
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
          books_Book.id = Int32(books_Book$["details"]["id"] as? Int ?? 0)
          books_Book.detailsID = Int32(books_Book$["details"]["detailsId"] as? Int ?? 0)
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
      book_Book.id = Int32(book_Book$["details"]["id"] as? Int ?? 0)
      book_Book.detailsID = Int32(book_Book$["details"]["detailsId"] as? Int ?? 0)
      req.book = book_Book
    }
    // end request mapping

    do {
      let res = try svc.getTypes(req)
      var jsRes: [String: Any] = [:]

      // response mapping
      jsRes["dbl"] = res.dbl
      jsRes["flt"] = res.flt
      jsRes["intr32"] = res.intr32
      jsRes["intr64"] = res.intr64
      jsRes["uintr32"] = res.uintr32
      jsRes["uintr64"] = res.uintr64
      jsRes["suint32"] = res.suint32
      jsRes["suint64"] = res.suint64
      jsRes["fxd32"] = res.fxd32
      jsRes["fxd64"] = res.fxd64
      jsRes["sfxd32"] = res.sfxd32
      jsRes["sfxd64"] = res.sfxd64
      jsRes["bln"] = res.bln
      jsRes["str"] = res.str
      jsRes["bytx"] = res.bytx
      var books$: [[String: Any]] = []
      for item in res.books {
        let _books_Book = item
        var _books_Book$: [String: Any] = [:]
        _books_Book$["isbn"] = _books_Book.isbn
        _books_Book$["title"] = _books_Book.title
        _books_Book$["author"] = _books_Book.author
        _books_Book$["pages"] = _books_Book.pages
        _books_Book$["isActivate"] = _books_Book.isActivate
        let _details_BookDetails = _books_Book.details
        var _details_BookDetails$: [String: Any] = [:]
        _details_BookDetails$["pages"] = _details_BookDetails.pages
        _books_Book$["details"] = _details_BookDetails$
        _books_Book$["id"] = _books_Book.id
        _books_Book$["detailsId"] = _books_Book.detailsID
        books$.append(_books_Book$)
      }
      jsRes["books"] = books$
      let _book_Book = res.book
      var _book_Book$: [String: Any] = [:]
      _book_Book$["isbn"] = _book_Book.isbn
      _book_Book$["title"] = _book_Book.title
      _book_Book$["author"] = _book_Book.author
      _book_Book$["pages"] = _book_Book.pages
      _book_Book$["isActivate"] = _book_Book.isActivate
      let _details_BookDetails = _book_Book.details
      var _details_BookDetails$: [String: Any] = [:]
      _details_BookDetails$["pages"] = _details_BookDetails.pages
      _book_Book$["details"] = _details_BookDetails$
      _book_Book$["id"] = _book_Book.id
      _book_Book$["detailsId"] = _book_Book.detailsID
      jsRes["book"] = _book_Book$
      // end response mapping

      resolve(jsRes)
    } catch {
      reject("ERROR", error.localizedDescription, error)
    }
  }


  @objc func getBook(_ jsReq: [String: Any], resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let svc = BooksGrpcClient
    var req = Book_GetBookRequest()

    // request mapping
    req.isbn = Int64(jsReq["isbn"] as? Int ?? 0)
    // end request mapping

    do {
      let res = try svc.getBook(req)
      var jsRes: [String: Any] = [:]

      // response mapping
      jsRes["isbn"] = res.isbn
      jsRes["title"] = res.title
      jsRes["author"] = res.author
      jsRes["pages"] = res.pages
      jsRes["isActivate"] = res.isActivate
      let _details_BookDetails = res.details
      var _details_BookDetails$: [String: Any] = [:]
      _details_BookDetails$["pages"] = _details_BookDetails.pages
      jsRes["details"] = _details_BookDetails$
      jsRes["id"] = res.id
      jsRes["detailsId"] = res.detailsID
      // end response mapping

      resolve(jsRes)
    } catch {
      reject("ERROR", error.localizedDescription, error)
    }
  }


  @objc func getBooksViaAuthor(_ jsReq: [String: Any], resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let svc = BooksGrpcClient
    var req = Book_GetBookViaAuthor()

    // request mapping
    req.author = jsReq["author"] as? String ?? ""
    // end request mapping

    do {
      let res = try svc.getBooksViaAuthor(req)
      var jsRes: [String: Any] = [:]

      // response mapping
      jsRes["isbn"] = res.isbn
      jsRes["title"] = res.title
      jsRes["author"] = res.author
      jsRes["pages"] = res.pages
      jsRes["isActivate"] = res.isActivate
      let _details_BookDetails = res.details
      var _details_BookDetails$: [String: Any] = [:]
      _details_BookDetails$["pages"] = _details_BookDetails.pages
      jsRes["details"] = _details_BookDetails$
      jsRes["id"] = res.id
      jsRes["detailsId"] = res.detailsID
      // end response mapping

      resolve(jsRes)
    } catch {
      reject("ERROR", error.localizedDescription, error)
    }
  }


  @objc func getGreatestBook(_ jsReq: [String: Any], resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let svc = BooksGrpcClient
    var req = Book_GetBookRequest()

    // request mapping
    req.isbn = Int64(jsReq["isbn"] as? Int ?? 0)
    // end request mapping

    do {
      let res = try svc.getGreatestBook(req)
      var jsRes: [String: Any] = [:]

      // response mapping
      jsRes["isbn"] = res.isbn
      jsRes["title"] = res.title
      jsRes["author"] = res.author
      jsRes["pages"] = res.pages
      jsRes["isActivate"] = res.isActivate
      let _details_BookDetails = res.details
      var _details_BookDetails$: [String: Any] = [:]
      _details_BookDetails$["pages"] = _details_BookDetails.pages
      jsRes["details"] = _details_BookDetails$
      jsRes["id"] = res.id
      jsRes["detailsId"] = res.detailsID
      // end response mapping

      resolve(jsRes)
    } catch {
      reject("ERROR", error.localizedDescription, error)
    }
  }


  @objc func getBooks(_ jsReq: [String: Any], resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let svc = BooksGrpcClient
    var req = Book_GetBookRequest()

    // request mapping
    req.isbn = Int64(jsReq["isbn"] as? Int ?? 0)
    // end request mapping

    do {
      let res = try svc.getBooks(req)
      var jsRes: [String: Any] = [:]

      // response mapping
      var items$: [[String: Any]] = []
      for item in res.items {
        let _items_Book = item
        var _items_Book$: [String: Any] = [:]
        _items_Book$["isbn"] = _items_Book.isbn
        _items_Book$["title"] = _items_Book.title
        _items_Book$["author"] = _items_Book.author
        _items_Book$["pages"] = _items_Book.pages
        _items_Book$["isActivate"] = _items_Book.isActivate
        let _details_BookDetails = _items_Book.details
        var _details_BookDetails$: [String: Any] = [:]
        _details_BookDetails$["pages"] = _details_BookDetails.pages
        _items_Book$["details"] = _details_BookDetails$
        _items_Book$["id"] = _items_Book.id
        _items_Book$["detailsId"] = _items_Book.detailsID
        items$.append(_items_Book$)
      }
      jsRes["items"] = items$
      // end response mapping

      resolve(jsRes)
    } catch {
      reject("ERROR", error.localizedDescription, error)
    }
  }

  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
