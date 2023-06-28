//
//  ViewControllerC.swift
//  iOS
//
//  Created by Sansi Mac on 2023/6/14.
//

/*
 目的：iOS的swift与后端的node.js网络通信安全代码示例。
 结果：失败。
 注：加密不止网络通信模块，还含括其它方面。如登录时，需要使用post请求，并将账户密码由明文转成密文等。
 */
import UIKit
import Foundation
import YYKit
import NSHash // 生生bug，无法运行。应该是这个第三库太老了。问题是缺少arc文件。

class ViewControllerC: UIViewController, URLSessionDelegate {
    var string = "NSHash"
    var str = "我是hello，world。"

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .gray
        self.title = "nav";
        
//        funcA()
        encryptionAndSecurity()
        encryptionAndSecurityC()
    }
    
    func funcA() {
        /**/
//        let url = URL(string: "https://your-api-endpoint.com/api/users")!
//        let url = URL(string: "192.168.233.215:3000")!
        let url = URL(string: "192.168.233.215:3000/api/users")!
//        let url = URL(string: "https:192.168.233.215:3000/api/users")!

        // 创建 URLSession 实例，并配置 SSL 验证和身份验证
        let session = URLSession(configuration: .default, delegate: self, delegateQueue: nil)

        // 创建 HTTP 请求
        var request = URLRequest(url: url)
        request.addValue("Bearer your-token", forHTTPHeaderField: "Authorization")

        // 发起请求
        let task = session.dataTask(with: request) { (data, response, error) in
            if let error = error {
                // 处理错误
                print("Error: \(error)")
            } else if let data = data {
                // 处理响应数据
                let responseString = String(data: data, encoding: .utf8)
                print("Response: \(responseString ?? "")")
            }
        }

        // 启动请求
        task.resume()
    }
    
    /**/
    // 加密和安全
    func encryptionAndSecurity() {
        print("MD5 as String:          \(string.md5())")
        print("SHA1 as String:         \(string.sha1())")
        print("SHA256 as String:       \(string.sha256())")
        print("SHA512 as String:       \(string.sha512())")
        print("MD5 as Data:            \(string.md5Data())")
        print("SHA1 as Data:           \(string.sha1Data())")
        print("SHA256 as Data:         \(string.sha256Data())")
        print("SHA512 as Data:         \(string.sha512Data())")
    }
     
    func encryptionAndSecurityB() {
        /*
        // Use zero or one of the following to control the maximum line length after which a line ending is inserted. No line endings are inserted by default.
        NSDataBase64Encoding64CharacterLineLength = 1UL << 0,
        NSDataBase64Encoding76CharacterLineLength = 1UL << 1,
        // Use zero or more of the following to specify which kind of line ending is inserted. The default line ending is CR LF.
        NSDataBase64EncodingEndLineWithCarriageReturn = 1UL << 4,
        NSDataBase64EncodingEndLineWithLineFeed = 1UL << 5,
         */
//        var strB = str.base64EncodedString(with: 1)
        
    }
    
    func encryptionAndSecurityC() {
        print("YYKit 加密：\(string.sha256() ?? "0")")
    }
}
