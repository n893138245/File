//
//  ViewController.swift
//  iOS
//
//  Created by Sansi Mac on 2023/5/22.
//

import UIKit
import Moya
import SwiftyJSON

class ViewController: UIViewController {
    
    let provider = MoyaProvider<API>()
    var array = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"]
    var isAddOrChange: String = ""

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .gray
        self.title = "nav";
        self.navigationController?.navigationBar.addSubview(addBtn)
        initView()
        networking()
    }

    func initView() {
        view.addSubview(tableView)
    }
    
    func networking() {
        baseNetworking()
    }
// MARK: - UI
    lazy var loginBtn: UIButton = {
        let view = UIButton(type: .custom);
//        view.frame = CGRect(x: 100, y: 100, width: 100, height: 44)
        view.frame = CGRect(x: 0, y: 0, width: 100, height: 44)
        view.tag = 1000
        view.setTitle("login", for: .normal)
        view.backgroundColor = .red
        view.addTarget(self, action: #selector(loginBtnClick), for: .touchUpInside)
        return view
    }()
    
    @objc func loginBtnClick(sender: UIButton) {
        print("loginBtnClick:", sender.tag)
        networking()
    }
    
    lazy var addBtn: UIButton = {
        let view = UIButton(type: .custom);
        view.frame = CGRect(x: 0, y: 0, width: 100, height: 44)
//        view.frame = CGRect(x: 0, y: 0, width: 100, height: 44)
        view.tag = 1001
        view.setTitle("Add", for: .normal)
        view.backgroundColor = .red
        view.addTarget(self, action: #selector(addBtnClick), for: .touchUpInside)
        return view
    }()
    
    @objc func addBtnClick(sender: UIButton) {
        print("addBtnClick:", sender.tag)
        isAddOrChange = "add"
        alert(indexPath: [0, 0])
    }
    
    lazy var tableView: UITableView = {
        let view = UITableView.init(frame: CGRect(x: 0, y: 0, width: view.frame.size.width, height: view.frame.size.height), style: .plain)
        view.delegate = self
        view.dataSource = self
        view.backgroundColor = .cyan
        return view
    }()
    
// MARK: - networking
    func baseNetworking() {
        provider.request(.getUsers) { result in
            switch result {
                case .success(let response):
                    do {
                        let jsonData = try JSON(data: response.data) // 数据得经过处理，方能显示正确
                        print("返回结果是：\(jsonData)")
//                        if !validateRepsonse(response: jsonData.dictionary, needShowFailAlert: needShowFailAlert, failure: failureCallback) { return }
//                        let respModel = ResponseModel()
//                        /// 这里的 -999的code码 需要根据具体业务来设置
//                        respModel.code = jsonData[responseCodeKey].int ?? -999
//                        respModel.message = jsonData[responseMessageKey].stringValue
//
//                        if respModel.code == successCode {
//                            respModel.dataString = jsonData[responseDataKey].rawString() ?? ""
//                            successCallback(respModel)
//                        } else {
//                            errorHandler(code: respModel.code , message: respModel.message , needShowFailAlert: needShowFailAlert, failure: failureCallback)
//                            return
//                        }

                    } catch {
                        // code = 1000000 代表JSON解析失败  这里根据具体业务来自定义
//                        errorHandler(code: 1000000, message: String(data: response.data, encoding: String.Encoding.utf8)!, needShowFailAlert: needShowFailAlert, failure: failureCallback)
                        print("error_2:", error)
                    }
                case .failure(let error):
                    // 处理错误
                    print("error_1:", error)
            }
        }
    }
    
    // MARK: - Other
    func alert(indexPath: IndexPath) {
        // 创建一个 UIAlertController
        let alertController = UIAlertController(title: "提示", message: "请输入内容", preferredStyle: .alert)
        // 添加一个输入框
        alertController.addTextField { (textField) in
            textField.placeholder = "请输入"
        }
        // 添加一个取消按钮
        alertController.addAction(UIAlertAction(title: "取消", style: .cancel, handler: nil))
        // 添加一个确认按钮
        alertController.addAction(UIAlertAction(title: "确定", style: .default, handler: { (_) in
            // 在点击确定按钮时，获取输入框的文本内容
            if let textField = alertController.textFields?.first {
                let inputText = textField.text ?? ""
                print("输入的内容是：\(inputText)")
                if (self.isAddOrChange == "add") {
                    self.addData(data: inputText)
                } else {
                    self.changeData(indexPath: indexPath, data: inputText)
                }
                self.isAddOrChange = ""
                self.tableView.reloadData()
            }
        }))
        // 显示提示框
        present(alertController, animated: true, completion: nil)
    }
    
    // MARK: 增删改查
    func addData(data: String) {
        array.insert(data, at: 0) // 头部插入
//        self.array.append(data) // 末尾插入
    }

    func deleteData(indexPath: IndexPath) {
        array.remove(at: indexPath.row)
    }

    func changeData(indexPath: IndexPath, data: String) {
        self.array[indexPath.row] = data // 增删改查：改 直接更改数据
        // 先删后增操作，也能实现更改目的
//        array.remove(at: indexPath.row)
//        array.insert(inputText, at: indexPath.row)
    }
    
    func searchData(indexPath: IndexPath) -> String {
        return array[indexPath.row]
    }
}

// MARK: - tableView
extension ViewController: UITableViewDelegate, UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return array.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let identifier = "mycell"
        var cell = tableView.dequeueReusableCell(withIdentifier:identifier)
        if cell == nil {
            cell = UITableViewCell.init(style: .subtitle, reuseIdentifier: identifier)
//            cell?.selectionStyle = .none
        }
        cell?.textLabel?.text = searchData(indexPath: indexPath) // 增删改查：查
//        cell?.textLabel?.text = array[indexPath.row]
//        cell?.textLabel?.text = "textLabel"
//        cell?.detailTextLabel?.text = "detailTextLabel"
        return cell ?? UITableViewCell()
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        print("点击了第", indexPath.row ,"个")
        isAddOrChange = "change"
        alert(indexPath: indexPath)
    }
    
    func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        return true
    }
    
    func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            // 删除对应位置的数据
//            array.remove(at: indexPath.row) // 增删改查：删
            deleteData(indexPath: indexPath)
            // 更新 TableView 的显示
            tableView.deleteRows(at: [indexPath], with: .fade)
        }
    }
}
