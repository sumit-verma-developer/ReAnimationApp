import Foundation
import React
import UIKit

@objc(LoginModule)
class LoginModule: NSObject {

    @objc
    func openLoginScreen() {
        DispatchQueue.main.async {
            let loginVC = LoginViewController()
            loginVC.modalPresentationStyle = .fullScreen
            if let rootVC = UIApplication.shared.keyWindow?.rootViewController {
                rootVC.present(loginVC, animated: true, completion: nil)
            }
        }
    }

    @objc
    func openSignupScreen() {
        DispatchQueue.main.async {
            let signupVC = SignupViewController()
            signupVC.modalPresentationStyle = .fullScreen
            if let rootVC = UIApplication.shared.keyWindow?.rootViewController {
                rootVC.present(signupVC, animated: true, completion: nil)
            }
        }
    }
}
