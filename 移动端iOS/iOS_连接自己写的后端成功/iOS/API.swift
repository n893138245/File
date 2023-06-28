//
//  API.swift
//  iOS
//
//  Created by Sansi Mac on 2023/5/22.
//

import Moya
import Alamofire

enum API {
    case getUsers
    case searchDetailData(id: Int)
    case addData(id: Int, name: String, url: String, alexa: Int, country: String)
    case deleteData(id: Int)
    case changeData(id: Int, name: String, url: String, alexa: Int, country: String)
}

extension API: TargetType {
    var baseURL: URL {
//        return URL(string: "https://www.baidu.com")!
//        return URL(string: "http://localhost:5173/")!
//        return URL(string: "http://127.0.0.1:3000/")!
//        return URL(string: "http://127.0.0.1:8080/")!
//        return URL(string: "http://127.0.0.1:8081/")!
//        return URL(string: "http://127.0.0.1:8888/")!
//        return URL(string: "http://82.156.141.27/")! // 腾讯云_轻量应用服务器_试用版1个月
//        return URL(string: "http://82.156.141.27:8080/")!
//        return URL(string: "http://82.156.141.27:8081/")!
        return URL(string: "http://82.156.141.27:8889/")!
//        return URL(string: "127.0.0.1:8889/api/news/")!
//        return URL(string: "http://127.0.0.1:8889/api/news/")!
//        return URL(string: "http://localhost:8889/api/news/")!
//        return URL(string: "http://192.168.233.215:8889/")! // 注：请注意，如果你想在不同的设备或计算机上进行网络通信，你需要使用实际的 IP 地址或域名，而不是使用 127.0.0.1。
//        return URL(string: "http://192.168.233.215:8889/api/news/7")!
//        return URL(string: "http://192.168.31.25:80/deviceService/v1/devices/0000301171424244/log?count=40&end=2022-03-05T17:55:34&offset=0&start=2021-03-05")!
//        return URL(string: "https://api.cportal.cctv.com/api/rest/articleInfo/getScrollList?n=20&version=1&p=1&app_version=810")!
    }
    
    var path: String {
        switch self {
        case .getUsers:
            return "api/news"
//            return ""
        case .searchDetailData(id: let id):
            return "api/news/\(id)"
        case .addData:
//        case .addData(_, _, _, _, _): // 非失败核心因素
            return "api/newsAdd"
        case .deleteData(id: let id):
            return "api/newsDelete/\(id)"
        case .changeData(id: let id, name: _, url: _, alexa: _, country: _):
            return "api/newsChange/\(id)"
        }
    }
    
    var method: Moya.Method {
        switch self {
        case .getUsers:
            return .get
        case .searchDetailData(id: _):
            return .get
        case .addData:
            return .post
        case .deleteData(_):
            return .delete
        case .changeData(id: _, name: _, url: _, alexa: _, country: _):
            return .put
        }
    }
    
    var task: Task {
        var param: [String: Any] = [:]
        switch self {
        case .getUsers:
            return .requestPlain
        case .searchDetailData(id: _):
            return .requestPlain
        case .addData(let id, let name, let url, let alexa, let country):
            param["id"] = id
            param["name"] = name
            param["url"] = url
            param["alexa"] = alexa
            param["country"] = country
//            return .requestPlain // 失败核心因素
//            return .requestParameters(parameters: param, encoding: URLEncoding.default) // 失败核心因素
//            return .requestParameters(parameters: param, encoding: JSONEncoding.default) // 非失败核心因素
//            break // 非失败核心因素
        case .deleteData(_):
            break
        case .changeData(id: let id, name: let name, url: let url, alexa: let alexa, country: let country): 
            param["id"] = id
            param["name"] = name
            param["url"] = url
            param["alexa"] = alexa
            param["country"] = country
        }
        if param.count > 0 {
            return .requestParameters(parameters: param, encoding: JSONEncoding.default)
        }
        return .requestPlain
    }
    /*
    var headers: [String: String]? {
        return nil
    }
     */
    // ————————————————————————————————————————————————————————————————————————
    public var validate: Bool {
        return false
    }
    
    public var sampleData: Data {
        return "{}".data(using: String.Encoding.utf8, allowLossyConversion: true)!
    }
    /**/
    //请求头设置
    public var headers: [String : String]? {
        var header = [String : String]()
//        let uuid = UUID().uuidString
//        header["requestId"] = uuid
        header["Content-type"] = "application/json; charset=utf-8"
//        header["Content-type"] = "application/json;" // 失败核心因素
//        header["requestId"] = "907AF2B6-67A7-4C47-AA92-D9DF59907741"
//        header["Authorization"] = "Basic dXZsaWdodDp1dmxpZ2h0LXNlcnZlci1nM2E0QGlqaw=="
        return header
    }
     
}

extension Moya.Response{
    func json<T>() -> T?{
        guard
            let json = try? JSONSerialization.jsonObject(with: data, options: .mutableContainers) as? T else {
            return nil
        }
        return json
    }
}
/* 操作：降版本Alamofire (5.4.4)，不确定是不是这个问题，忘记了索引。 */
struct JSONArrayEncoding: ParameterEncoding {
    static let `default` = JSONArrayEncoding()
    func encode(_ urlRequest: URLRequestConvertible, with parameters: Parameters?) throws -> URLRequest {
        var request = try urlRequest.asURLRequest()
        guard let json = parameters?["jsonArray"] else {
            return request
        }
        let data = try JSONSerialization.data(withJSONObject: json, options: [])
        if request.value(forHTTPHeaderField: "Content-Type") == nil {
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        }
        request.httpBody = data
        return request
    }
}
 
extension Moya.Response {
    func mapNSArray() throws -> NSArray {
        let any = try self.mapJSON()
        guard let array = any as? NSArray else {
            throw MoyaError.jsonMapping(self)
        }
        return array
    }
}
