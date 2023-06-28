//
//  ViewController.swift
//  iOS
//
//  Created by Sansi Mac on 2023/5/22.
//


/*
 目的：对后端实现网络请求“增删改查”操作。
 结果：成功。
 */
import UIKit
import Moya
import SwiftyJSON

class ViewControllerB: UIViewController {
    
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
//        searchDetailData()
//        addDataNetworking()
//        deleteDataNetworking()
//        changeDataNetworking()
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
    
// MARK: - networking - 增删改查
    func baseNetworking() { // 查
        provider.request(.getUsers) { result in
            switch result {
                case .success(let response):
                    do {
                        let jsonData = try JSON(data: response.data) // 数据得经过处理，方能显示正确
                        print("返回结果是：\(jsonData)")
                    } catch {
                        print("error_2:", error)
                    }
                case .failure(let error):
                    // 处理错误
                    print("error_1:", error)
            }
        }
    }
    
    func searchDetailData() { // 查-详情
        provider.request(.searchDetailData(id: 2)) { result in
            switch result {
                case .success(let response):
                    do {
                        let jsonData = try JSON(data: response.data) // 数据得经过处理，方能显示正确
                        print("返回结果是：\(jsonData)")
                    } catch {
                        print("error_2:", error)
                    }
                case .failure(let error):
                    // 处理错误
                    print("error_1:", error)
            }
        }
    }
    
    func addDataNetworking() { // 增
        /**/
        provider.request(.addData(id: 7, name: "腾讯", url: "www.tengxun.con", alexa: 100, country: "CN")) { result in
            switch result {
                case .success(let response):
                    do {
                        let jsonData = try JSON(data: response.data) // 数据得经过处理，方能显示正确
                        print("返回结果是：\(jsonData)")
                    } catch {
                        print("error_2:", error)
                    }
                case .failure(let error):
                    // 处理错误
                    print("error_1:", error)
            }
        }
        
    }
    
    func deleteDataNetworking() { // 删
        provider.request(.deleteData(id: 3)) { result in
            switch result {
                case .success(let response):
                    do {
                        let jsonData = try JSON(data: response.data) // 数据得经过处理，方能显示正确
                        print("返回结果是：\(jsonData)")
                    } catch {
                        print("error_2:", error)
                    }
                case .failure(let error):
                    // 处理错误
                    print("error_1:", error)
            }
        }
    }
    
    func changeDataNetworking() { // 改
        provider.request(.changeData(id: 3, name: "腾讯B", url: "www.tengxun.conB", alexa: 202, country: "CNB")) { result in
            switch result {
                case .success(let response):
                    do {
                        let jsonData = try JSON(data: response.data) // 数据得经过处理，方能显示正确
                        print("返回结果是：\(jsonData)")
                    } catch {
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
    
    // MARK: 增删改查-array
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
extension ViewControllerB: UITableViewDelegate, UITableViewDataSource {
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
